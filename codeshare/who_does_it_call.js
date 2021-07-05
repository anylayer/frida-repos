/*
 * To find out who the function at 0x1234 calls the next time it is called:
 *   start(ptr('0x1234'))
 *
 * Or to ask the same question about one or more Objective-C methods, whichever is called first:
 *   start('-[LicenseManager *]')
 *
 * Or any exported function named open:
 *   start('exports:*!open*')
 */

var listeners = [];
var activated = false;

function start (target) {
  stop();

  if (typeof target === 'string') {
    var pattern = target;

    var resolver = new ApiResolver((pattern.indexOf(' ') === -1) ? 'module' : 'objc');
    var matches = resolver.enumerateMatchesSync(pattern);
    if (matches.length === 0) {
      throw new Error('No matching methods found');
    }

    matches.forEach(function (match) {
      stalkMethod(match.name, match.address);
    });
  } else {
    stalkMethod(target.toString(), target);
  }
}

function stop () {
  listeners.forEach(function (listener) {
    listener.detach();
  });
  listeners = [];
  activated = false;
}

function stalkMethod (name, impl) {
  console.log('Stalking next call to ' + name);

  var listener = Interceptor.attach(impl, {
    onEnter: function (args) {
      if (activated) {
        return;
      }
      activated = true;

      var targets = {};
      this.targets = targets;

      console.log('\n\nStalker activated: ' + name);
      Stalker.follow({
        events: {
          call: true
        },
        onCallSummary: function (summary) {
          Object.keys(summary).forEach(function (target) {
            var count = summary[target];
            targets[target] = (targets[target] || 0) + count;
          });
        }
      });
    },
    onLeave: function (reval) {
      var targets = this.targets;
      if (targets === undefined) {
        return;
      }

      Stalker.unfollow();
      console.log('Stalker deactivated: ' + name);

      printSummary(targets);
    }
  });
  listeners.push(listener);
}

function printSummary (targets) {
  var items = [];
  var total = 0;
  Object.keys(targets).forEach(function (target) {
    var name = DebugSymbol.fromAddress(ptr(target)).toString();
    var count = targets[target];
    var tokens = name.split(' ', 2).map(function (t) { return t.toLowerCase(); });
    items.push([name, count, tokens]);
    total += count;
  });
  items.sort(function (a, b) {
    var tokensA = a[2];
    var tokensB = b[2];
    if (tokensA.length === tokensB.length) {
      return tokensA[tokensA.length - 1].localeCompare(tokensB[tokensB.length - 1]);
    } else if (tokensA.length > tokensB.length) {
      return -1;
    } else {
      return 1;
    }
  });

  if (items.length > 0) {
    console.log('');
    console.log('COUNT\tNAME');
    console.log('-----\t----');
    items.forEach(function (item) {
      var name = item[0];
      var count = item[1];
      console.log(count + '\t' + name);
    });
  }

  console.log('');
  console.log('Unique functions called: ' + items.length);
  console.log('   Total function calls: ' + total);
  console.log('');
}
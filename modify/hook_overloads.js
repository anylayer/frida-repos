function hookOverloads(className, func) {
  var clazz = Java.use(className);
  var overloads = clazz[func].overloads;
  for (var i in overloads) {
    // console.log(overloads[i].argumentTypes)  // it can print normally
    // if (overloads[i].hasOwnProperty('argumentTypes')) {  // return false, why?
      var parameters = [];

      var curArgumentTypes = overloads[i].argumentTypes, args = [], argLog = '[';
      for (var j in curArgumentTypes) {
        var cName = curArgumentTypes[j].className;
        parameters.push(cName);
        argLog += "'(" + cName + ") ' + v" + j + ",";
        // argLog += "{'type':" + cName + ", "+"'value': v" + j + "},";
        args.push('v' + j);
      }
      argLog += ']';

      var script = "var ret = this." + func + '(' + args.join(',') + ") || '';\n"
        + "console.log(JSON.stringify(" + argLog + "));\n"
        // + "console.log(argLog[0]);\n"
        // + "console.log(ret);\n"
        + "return ret;"

      args.push(script);
      console.log(script)
      clazz[func].overload.bind(this, parameters).implementation = Function.bind(null, args);  // => An error has occurred, as shown below
    // }
  }
}

// Java.perform(function() {
//   hookOverloads('java.lang.StringBuilder', '$init');
// })

// function notifyNewSharedPreference() {
//   Java.use('android.app.SharedPreferencesImpl$EditorImpl').putString.overload('java.lang.String', 'java.lang.String').implementation = function(k, v) {
//     console.log('[SharedPreferencesImpl]', k, '=', v);
//     return this.putString(k, v);
//   }
// }

// Java.perform(() => {
//   var Location = Java.use('android.location.Location');
//   Location.getLatitude.implementation = function() {
//     console.log('Latitude')
//     return 0;
//   }
//   Location.getLongitude.implementation = function() {
//     console.log('Longitude')
//     return 0;
//   }
// })



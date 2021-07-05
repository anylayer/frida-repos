const membase = Module.findBaseAddress('libhwui.so');
const funcs = [ '0x77716205f8'];
for (var i in funcs) {
    var funcPtr = memAddress(membase, '0x0', funcs[i]);
    var handler = (function() {
        var name = funcs[i];
        return function(args) {
            console.log(name + ': ');
            var trace = Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress);
            for (var j in trace)
                console.log(trace[j]);
        };
    })();
    Interceptor.attach(funcPtr, {onEnter: handler});
}

function main() {
    Java.perform(function () {
        var someclass = Java.use("com.lilac.hrc.MainActivity");
        const StringBuilder = Java.use('java.lang.StringBuilder');
        someclass.test.implementation = function () {
            console.warn("Enter Outer field");
            StringBuilder.toString.implementation = function () {
                var res = this.toString();
                console.log(res);
                return res;
            };
            var res = this.test.apply(this, arguments);
            StringBuilder.toString.implementation = null;
            return res;
        };



    });


}

// main();
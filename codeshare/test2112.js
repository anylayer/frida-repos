Java.perform(function () {

        var genOTP = Java.use("com.fpt.fisplugin.fisplugin.FISPlugin");
        const genFunc = genOTP.b.overload("java.lang.String", "java.lang.String");
        console.log(genFunc);
		genFunc.call(genFunc, 'e24df920078c3dd4e7e8d2442f00e5c9a', '7595');
});

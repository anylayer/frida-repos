Java.perform(function() {
    var RootBeer = Java.use("com.harrison.demo.autoairpay.ui.main.MainActivity");


    RootBeer.verifyInfo.overload().implementation = function() {
        return true;
    };


});
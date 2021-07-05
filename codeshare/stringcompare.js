Java.perform(function() {

    var str = Java.use('java.lang.String');

    str.equals.overload('java.lang.Object').implementation = function(obj) {
        var response = str.equals.overload('java.lang.Object').call(this, obj);
        if (obj) {
            if (obj.toString().length > 10) {

                send("Is " + str.toString.call(this) + " == " + obj.toString() + "? " + response);
            }
        }
        return response;
    }

});

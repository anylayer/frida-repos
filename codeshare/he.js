 Java.perform(function() {
   const StringBuilder = Java.use('java.lang.StringBuilder');
   StringBuilder.toString.implementation = function() {

     var res = this.toString();
       var tmp = "";
       if (res !== null) {
         tmp = res.toString().replace("/n", "");
         console.log(tmp);
       }
     return res;
   };

 });
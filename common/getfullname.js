function getFullName(name){
    Java.perform(function(){
        Java.enumerateLoadedClassesSync().forEach(function(className){
            if(className.indexOf(name)!=-1){
                return className
            }
        })
    });
}

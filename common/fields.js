function getFieldWrapper(clazz, fieldName, remarkName) {
    var field = clazz.class.getDeclaredField(fieldName);
    field.setAccessible(true);
    var className = clazz.class.getName();
    var fieldWrapper = field.get(clazz)
    if (null == fieldWrapper) {
        return null;
    }
    remarkName = remarkName || '*';
    return fieldWrapper
}

function getFieldValue(clazz, fieldName, remarkName) {
    var value = getFieldWrapper(clazz, fieldName, remarkName);
    if (null == value){
        return null;
    }
    return value.toString()
}


function printAllFieldValue(clazz) {
    console.log("\n class[" + clazz.class.getName() + "] Fields:\n");
    var fields = clazz.getClass().getFields();
    fields.forEach(function (field){
        field.setAccessible(true);
        try{
            var value = field.get(clazz);
        }catch(e){
            console.log(e);
        }
        console.log("\n[-]" + field.getName() + ":" + value.toString());
    })
}

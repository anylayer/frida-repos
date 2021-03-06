function stringToByte(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for(var i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if(c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if(c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if(c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        } else {
            bytes.push(c & 0xFF);
        }
    }
    return bytes;


}

function byteToString(arr) {
    if(typeof arr === 'string') {
        return arr;
    }
    var str = '',
        _arr = arr;
    for(var i = 0; i < _arr.length; i++) {
        var one = _arr[i].toString(2),
            v = one.match(/^1+?(?=0)/);
        if(v && one.length == 8) {
            var bytesLength = v[0].length;
            var store = _arr[i].toString(2).slice(7 - bytesLength);
            for(var st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2);
            }
            str += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1;
        } else {
            str += String.fromCharCode(_arr[i]);
        }
    }
    return str;
}

function byte2string(array){
    var result = "";
    for(var i = 0; i < array.length; ++i){
        result+= (String.fromCharCode(array[i]));
    }
   return result;
}


function string2byte(str){
  for (var i = 0,arr=[]; i < str.length;i++){
    arr.push(str.charCodeAt(i));
  }
  return new Uint8Array(arr);
}


function intTobytes(n) {
  var bytes = [];
  for (var i = 0; i < 2; i++) {
    bytes[i] = n >> (8 - i * 8);

  }
  return bytes;
}


function arrayBuffeToString(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function byteToHexString(uint8arr) {
  if (!uint8arr) {
    return '';
  }

  var hexStr = '';
  for (var i = 0; i < uint8arr.length; i++) {
    var hex = (uint8arr[i] & 0xff).toString(16);
    hex = (hex.length === 1) ? '0' + hex : hex;
    hexStr += hex;
  }

  return hexStr.toUpperCase();
}




function bytes2hex(array) {
    var result = '';
    console.log('len = ' + array.length);
    for(var i = 0; i < array.length; ++i)
        result += ('0' + (array[i] & 0xFF).toString(16)).slice(-2);
    return result;
}


function jhexdump(array) {
    var ptr = Memory.alloc(array.length);
    for(var i = 0; i < array.length; ++i)
        Memory.writeS8(ptr.add(i), array[i]);
    console.log(hexdump(ptr, { offset: 0, length: array.length, header: false, ansi: false }));
}


const Class = Java.use("java.lang.Class");
function inspectObject(obj) {
    const obj_class = Java.cast(obj.getClass(), Class);
    const fields = obj_class.getDeclaredFields();
    const methods = obj_class.getMethods();
    console.log("Inspecting " + obj.getClass().toString());
    console.log("\tFields:");
    for (var i in fields)
        console.log("\t\t" + fields[i].toString());
    console.log("\tMethods:");
    for (var i in methods)
        console.log("\t\t" + methods[i].toString());
}


function bytesToGson(byteArray){
    Java.openClassFile("/data/local/tmp/r0gson.dex").load();
    const gson = Java.use('com.r0ysue.gson.Gson');
    console.log(gson.$new().toJson(byteArray));
}

function bytesToStringByByteString(bytes){
    var ByteString = Java.use("com.android.okhttp.okio.ByteString");
    return ByteString.of(bytes).utf8()
}

function b64encode(str){
    return Buffer.from(str).toString('base64');
}

function b64decode(b64Str){
    return  Buffer.from(b64Str, 'base64').toString()
}
                                  
                                     

// var current_application = Java.use('android.app.ActivityThread').currentApplication();
// var context = current_application.getApplicationContext();

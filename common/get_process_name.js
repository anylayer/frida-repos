function get_process_name(){
    var openPtr = Module.getExportByName('libc.so', 'open');
    var readPtr = Module.getExportByName('libc.so', 'read');
    var closePtr = Module.getExportByName('libc.so', 'close');
                                         
    var open = new NativeFunction(openPtr, 'int', ['pointer', 'int']);
    var read = new NativeFunction(readPtr, 'int', ['int', 'pointer', 'int']);
    var close = new NativeFunction(closePtr, 'int', ['int']);
    
    var cmdline = Memory.allocUtf8String('/proc/self/cmdline');
    var fd = open(cmdline, 0);
    if (fd != -1){
        var buffer = Memory.alloc(0x1000);
        read(fd, buffer, 0x1000);
        var result = ptr(buffer).readCString();
        return result;
}

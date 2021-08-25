import frida


host = '172.16.11.80:5555'
package = 'com.ss.android.ugc.aweme'
manager = frida.get_device_manager()
remote_device = manager.add_remote_device(host)
session = remote_device.attach(package)

js = """
function leviathan(flag, timstamp, data){
	Java.perform(function () {
		var className = "com.ss.sys.ces.a";
		var hookClass = Java.use(className);
		var Encoder = Java.use('com.ss.a.b.a');
		console.log(timstamp);
		console.log(data);
		var result = hookClass.leviathan(flag, timstamp, Encoder.a(data));
		console.log(`result: ${result}`)
		return Encoder.a(result);
	})
}

rpc.exports = {
	get_x_gorgon: leviathan,
}
"""

script = session.create_script(js)
def on_message(message ,data):
    print (message)
script.on("message" , on_message)
script.load()
sys.stdin.read()

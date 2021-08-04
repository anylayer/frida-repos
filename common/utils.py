# such as library: hexdump binascii
import execjs


def hexdump(src, length=16):
    result = []
    digits = 4 if isinstance(src, str) else 2

    for i in range(0, len(src), length):
        s = src[i:i + length]
        hexa = ' '.join([hex(x)[2:].upper().zfill(digits) for x in s])
        text = ''.join([chr(x) if 0x20 <= x < 0x7F else '.' for x in s])
        result.append("{0:04X}".format(i) + ' '*3 + hexa.ljust(length * (digits + 1)) + ' '*3 + "{0}".format(text))

    return '\n'.join(result)
  
    
def makehex(value, size=4):
    temp = hex(value)[2:]
    if temp[-1] == 'L':
        temp = temp[:-1]
    return temp.zfill(size)


def str2hex(src: str):
    """python ->707974686f6e"""
    bytes_src = bytes(src, encoding='utf-8')
    return bytes_src.hex()


def hex2bytes(hex):
    hex = hex.replace(' ', '')
    return bytes.fromhex(hex)


def hex2str(hex)
return hex2bytes(hex).decode('utf-8')


hexStringTobytes = """
function hexStringTobytes(hex){
    for (var bytes = [], c = 0; c < hex.length; c += 2){
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return bytes
}
"""
bytesToHexString = """
function bytesToHexString(bytes){
    for (var hex = [], i = 0; i < bytes.length; i++) {
        var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
        hex.push((current >>> 4).toString(16));
        hex.push((current & 0xF).toString(16));
    }
    return hex.join('')
}
"""

def hex2jsbytes(hex):
    """5c7862395c7830315c786566 -> [92, 120, 98, 57, 92, 120, 48, 49, 92, 120, 101, 102]"""
    return execjs.compile(hexStringTobytes).call('hexStringTobytes', hex)


def jsbytes2hex(jsbytes):
    """[92, 120, 98, 57, 92, 120, 48, 49, 92, 120, 101, 102]->5c7862395c7830315c786566"""
    return execjs.compile(bytesToHexString).call('bytesToHexString', jsbytes)



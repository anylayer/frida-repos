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

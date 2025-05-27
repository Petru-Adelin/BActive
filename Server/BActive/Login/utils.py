from Crypto.Protocol.KDF import PBKDF2
#AES -> Advanced Encription Standard
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad

# initial generation of the salt
# binaries = get_random_bytes(32)
# print(binaries)

__SALT = b'd\n\xc8\x1a\x18\xc8\x88\\\xdcsx\xa0{\x97\xd7\x85,D6.w\x8c\x9f\xe07\xf1<\x84]\x8d\xb8\xd5'
__KEY = PBKDF2(password='genericPass', salt=__SALT, dkLen=32)


# returns the binary encryption of the password
def encrypt(password: str):
    bin_pass = password.encode('utf-8')
    cipher = AES.new(__KEY, AES.MODE_CBC)
    
    bin_data = cipher.encrypt(pad(bin_pass, AES.block_size))
    bin_res = cipher.iv + bin_data 
    return bin_res

def decrypt(binaries)-> str:
    # iv - binary buffer
    iv = binaries[:16]
    # entry - actual password
    entry = binaries[16:]

    cipher = AES.new(__KEY, AES.MODE_CBC, iv=iv)
    original = unpad(cipher.decrypt(entry), AES.block_size)
    print(original.decode('utf-8'))
    return original.decode('utf-8')


if __name__ == "__main__":
    passw = 'something#021'
    binaries = encrypt(passw)
    print(decrypt(binaries))
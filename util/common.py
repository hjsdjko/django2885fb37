# coding:utf-8
# author:ila
import hashlib
import base64
from Crypto.Cipher import DES,AES
from Crypto.Util.Padding import pad,unpad

class Common(object):

    def md5(self, pwd):
        md5 = hashlib.md5()
        md5.update(pwd.encode())
        return md5.hexdigest()





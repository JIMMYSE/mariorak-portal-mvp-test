import { AES, enc, pad, mode } from 'crypto-js';

const SECRET_KEY = process.env.SECRET_KEY as string;

export function cryptoJS() {
  return {
    // encryptString(value: string) {
    //   return AES.encrypt(value, SECRET_KEY).toString();
    // },
    // decryptString(value: string) {
    //   const bytes = AES.decrypt(value, SECRET_KEY);
    //   const res = bytes.toString(enc.Utf8);
    //   console.log('decodeString', res);
    //   return res;
    // },
    encryptObject(value: string) {
      return AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
    },
    decryptObject(value: string) {
      const bytes = AES.decrypt(value, SECRET_KEY);
      const decryptedData = bytes.toString(enc.Utf8);
      return JSON.parse(decryptedData.length ? decryptedData : '{}');
    },
    encodeByAES256(value: string) {
      const paddedKey = SECRET_KEY.padEnd(32, ' ');
      const cipher = AES.encrypt(value, enc.Utf8.parse(paddedKey), {
        iv: enc.Utf8.parse(''),
        padding: pad.Pkcs7,
        mode: mode.CBC,
      });
      return cipher.toString();
    },
  };
}

import CryptoJS from "crypto-js";
import { SECRET_KEY } from '@env';  // Import the secret key from the .env file
import { Base64 } from "js-base64";

export const Encrypt = (word) => {
    console.log(word);
    // return CryptoJS.AES.encrypt(word, SECRET_KEY).toString();
    return Base64.encode(word);
};

export const Decrypt = (word) => {
    return CryptoJS.AES.decrypt(word, SECRET_KEY).toString(CryptoJS.enc.Utf8);
};

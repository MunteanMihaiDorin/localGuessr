// userManagement.js
import CryptoJS from 'crypto-js';

const secretKey = '9:}w(Lv$*`3\'V8t|(lOd)Q:D5P*m0L';

function encryptPassword(password) {
  return CryptoJS.AES.encrypt(password, secretKey).toString();
}

function decryptPassword(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function register(username, password) {
  const encryptedPassword = encryptPassword(password);
  const user = { username, password: encryptedPassword };
  localStorage.setItem('user', JSON.stringify(user));
  alert('Registration successful');
}

export function login(username, password) {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser) {
    const decryptedPassword = decryptPassword(storedUser.password);
    if (storedUser.username === username && decryptedPassword === password) {
      alert('Login successful');
      return true;
    }
  }
  alert('Invalid username or password');
  return false;
}

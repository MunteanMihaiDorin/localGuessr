import CryptoJS from 'crypto-js';

const secretKey = '9:}w(Lv$*`3\'V8t|(lOd)Q:D5P*m0L';



export const fetchUserData = () => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(u => u.id === currentUser);
  }
  return null;
};

export async function getUserHighScore() {
  return parseInt(localStorage.getItem('highScore')) || 0;
}

export async function setUserHighScore(newHighScore) {
  localStorage.setItem('highScore', newHighScore);
}

class User {
  constructor(username, password) {
    this.username = username;
    this.password = this.encryptPassword(password);
    this.highScore = 0;
  }

  encryptPassword(password) {
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  }

  static decryptPassword(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  static fromStorage(storedUser) {
    const user = new User(storedUser.username, storedUser.password);
    user.password = storedUser.password; // already encrypted
    user.highScore = storedUser.highScore;
    return user;
  }
}

const saveUsersToStorage = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export function register(username, password) {
  const user = new User(username, password);
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  saveUsersToStorage(users);
  localStorage.setItem('currentUser', user.username);
  alert('Registration successful');
}

export function login(username, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const storedUser = users.find(user => user.username === username);
  if (storedUser) {
    const user = User.fromStorage(storedUser);
    const decryptedPassword = User.decryptPassword(user.password);
    if (decryptedPassword === password) {
      localStorage.setItem('currentUser', user.username);
      alert('Login successful');
      return true;
    }
  }
  alert('Invalid username or password');
  return false;
}

export function isLoggedIn() {
  return localStorage.getItem('currentUser') !== null;
}


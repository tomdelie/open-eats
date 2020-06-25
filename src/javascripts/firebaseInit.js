const firebase = require('firebase/app');
require('firebase/analytics');
require('firebase/auth');
require('firebase/firestore');
require('firebase/storage');

const firebaseConfig = {
  apiKey: "AIzaSyCzKpKxSXyRuFRbRP90p2L2vs4NWEN7n8w",
  authDomain: "pwa-esgi-9b79e.firebaseapp.com",
  databaseURL: "https://pwa-esgi-9b79e.firebaseio.com",
  projectId: "pwa-esgi-9b79e",
  storageBucket: "pwa-esgi-9b79e.appspot.com",
  messagingSenderId: "512589659646",
  appId: "1:512589659646:web:65ef0d3da820132f2c54af",
  measurementId: "G-KC5R1VKM38"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const db = firebase.firestore();

module.exports = { storageRef: storage.ref(), firebaseApp: firebaseApp, db: db };

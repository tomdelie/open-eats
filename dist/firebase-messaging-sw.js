importScripts('https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.5/firebase-messaging.js');

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

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
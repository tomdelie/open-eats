const { firebase } = require('./firebaseInit.js');
const notificationsButtons = document.getElementsByClassName('notifications');
const permissionIcon = document.getElementById('permission-icon');

const messaging = firebase.messaging();
messaging.usePublicVapidKey('BEWSsrNbhX997f-XZGc0VAfgJavgP-pT0LCKb75Y3PT3a6FNmMaNbMPp3_1zhMEdGVQj9uxsrKvY0JJuZOqor0U');

const initFirebaseMessaging = () => {
  messaging.requestPermission()
  .then(() => {
    console.log('Notif permission');
    return messaging.getToken();
  })
  .then((token) => {
    localStorage.setItem('token', token);
    console.log(`Token : ${token}`);
  })
  .catch((err) => {
    console.log(err)
  });
};

messaging.onTokenRefresh(() => {
  messaging.getToken()
  .then((newToken) => {
    localStorage.setItem('token', newToken);
    console.log(`New token : ${newToken}`);
  });
});

initFirebaseMessaging();

const updatePermissionIcon = () => {
  const status = localStorage.getItem('notifications');
  if (status === 'granted') {
    permissionIcon.src = '/images/notifications_active.svg'
  } else if (status === 'denied') {
    permissionIcon.src = '/images/notifications_off.svg'
  } else {
    permissionIcon.src = '/images/notifications.svg'
  }
};

const setPermission = (status) => {
  if (status === 'granted') {
    localStorage.setItem('notifications', 'granted');
  } else if (status === 'denied') {
    localStorage.setItem('notifications', 'denied');
  } else {
    localStorage.setItem('notifications', 'default');
  }

  updatePermissionIcon();
};

const requestPermission = (event) => {
  setPermission(event.target.dataset.status);

  if (Notification.permission === 'default') {
    Notification.requestPermission(status => {
      setPermission(status);
    });
  }
};

const areNotificationsAllowed = () => {
  return (localStorage.getItem('notifications') === 'granted');
};

Object.values(notificationsButtons).forEach(notificationsButton => {
  notificationsButton.addEventListener('click', requestPermission);
});

updatePermissionIcon();

module.exports = { areNotificationsAllowed: areNotificationsAllowed };
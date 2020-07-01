const notificationsButtons = document.getElementsByClassName('notifications');
const permissionIcon = document.getElementById('permission-icon');

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
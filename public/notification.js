/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const openNotification = (registration, notification) => {
  registration.getNotifications()
    .then(notifications => {
      let currentNotification;

      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].data
          && notifications[i].data.type === notification.type) {
          currentNotification = notifications[i];
        }
      }

      return currentNotification;
    }).then(currentNotification => {
      const options = {
        icon: 'https://res.cloudinary.com/elvis-rugamba/image/upload/v1582304341/z35smnjcnwpmukrr8lob.png',
        badge: 'https://res.cloudinary.com/elvis-rugamba/image/upload/v1582304341/z35smnjcnwpmukrr8lob.png',
        timestamp: new Date(Date.now()).toString(),
        tag: 'Barefoot-Nomad',
        dir: 'ltr'
      };

      if (currentNotification) {
        const notificationCount = currentNotification.data.count + 1;

        notification.count = notificationCount;
        options.body = `There are ${notificationCount} ${notification.type} requests.`;
        currentNotification.close();
      } else {
        notification.count = 1;
        options.body = notification.message;
      }

      notificationTitle = notification.type;
      options.data = notification;

      return registration.showNotification(notificationTitle, options);
    }).catch(error => { throw new Error(error); });
};

const pushNotification = notification => {
  if (!('Notification' in window)) {
    console.error('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification(notification.type, {
        body: notification.message,
        data: notification,
        icon: 'https://res.cloudinary.com/elvis-rugamba/image/upload/v1582304341/z35smnjcnwpmukrr8lob.png',
        badge: 'https://res.cloudinary.com/elvis-rugamba/image/upload/v1582304341/z35smnjcnwpmukrr8lob.png',
        timestamp: new Date(Date.now()).toString(),
        dir: 'ltr'
      });
      // openNotification(registration, notification);
    }).catch(error => console.log('Notification failed wtih', error));
  } else if (Notification.permission !== 'denied') {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification(notification.type, {
        body: notification.message,
        data: notification,
        icon: 'https://res.cloudinary.com/elvis-rugamba/image/upload/v1582304341/z35smnjcnwpmukrr8lob.png',
        badge: 'https://res.cloudinary.com/elvis-rugamba/image/upload/v1582304341/z35smnjcnwpmukrr8lob.png',
        timestamp: new Date(Date.now()).toString(),
        dir: 'ltr'
      });
      // openNotification(registration, notification);
    }).catch(error => console.log('Notification failed wtih', error));
  }
};

self.addEventListener('notificationclick', event => {
  const baseUrl = event.currentTarget.origin;
  const url = `${baseUrl}/${event.notification.data.link}`;

  event.notification.close();
  event.waitUntil(clients.matchAll({ type: 'window' }).then(clientList => {
    for (let i = 0; i < clientList.length; i++) {
      const client = clientList[i];
      if (client.url === url && 'focus' in client) return client.focus();
    }
    if (clients.openWindow) return clients.openWindow(url);
  }));
});

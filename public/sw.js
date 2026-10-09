self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(clients.claim());
});

self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || '/icons/icon-192x192.png',
      badge: '/icons/icon-96x96.png', // Ideally a small white transparent icon
      image: data.image || undefined,
      requireInteraction: data.requireInteraction || false,
      vibrate: [200, 100, 200, 100, 200, 100, 200], // Distinct pulse
      data: {
        dateOfArrival: Date.now(),
        primaryKey: Date.now().toString(),
        url: data.url || '/'
      },
      actions: [
        { action: 'open', title: 'Open' },
        { action: 'dismiss', title: 'Dismiss' }
      ]
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  const targetUrl = event.notification.data.url;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (windowClients) {
      // Check if there is already a window/tab open with the target URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        // If the URL matches exactly, focus it
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      // If we didn't find an existing tab, open a new one
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

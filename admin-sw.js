self.addEventListener('push', event => {
  event.waitUntil(self.registration.showNotification('🦊 新的匯款表單', {
    body: '有一筆新的匯款資料，點這裡查看後台。',
    data: { url: './admin.html' }
  }));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil((async () => {
    const url = new URL('./admin.html', self.registration.scope).href;
    const windows = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    const open = windows.find(client => client.url.startsWith(url));
    if (open) return open.focus();
    return clients.openWindow(url);
  })());
});

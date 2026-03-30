self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('push', (event) => {
  const origin = self.location.origin

  if (!event.data) return

  let payload = {
    title: '記憶の回廊',
    body: '今日の記憶術トレーニングを始めましょう。',
    url: '/',
    icon: `${origin}/icon-192.png`,
  }

  try {
    payload = { ...payload, ...event.data.json() }
  } catch (error) {
    // Keep default payload if parsing fails
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: payload.icon || `${origin}/icon-192.png`,
      data: { url: payload.url || '/' },
      tag: 'memory-corridor-daily-reminder',
      renotify: true,
      requireInteraction: false,
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const targetUrl = event.notification?.data?.url || '/'

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.navigate(targetUrl)
          return client.focus()
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl)
      }
      return undefined
    })
  )
})

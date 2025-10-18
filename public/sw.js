// public/sw.js をシンプルに
self.addEventListener('install', function (event) {
  console.log('Service Worker installing.')
  self.skipWaiting()
})

self.addEventListener('activate', function (event) {
  console.log('Service Worker activating.')
  return self.clients.claim()
})

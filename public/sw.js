// public/sw.js をシンプルに
self.addEventListener('install', function (event) {
  // Service Worker installing.
  self.skipWaiting()
})

self.addEventListener('activate', function (event) {
  // Service Worker activating.
  return self.clients.claim()
})

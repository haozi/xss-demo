/* global self caches  */

var cacheStorageKey = 'xss-1'

var cacheList = [
  '/',
  'http://127.0.0.1/app.js'
]
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheStorageKey).then(function (cache) {
      return cache.addAll(cacheList)
    }).then(function () {
      return self.skipWaiting()
    })
  )
})

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

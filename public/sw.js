importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js')

// Cache static assets
workbox.routing.registerRoute(
  /\.(?:js|css|png|jpg|jpeg|svg)$/,
  new workbox.strategies.StaleWhileRevalidate()
)

// Cache API responses
workbox.routing.registerRoute(
  /^https:\/\/api\.yourapp\.com\/.*$/,
  new workbox.strategies.NetworkFirst()
)

// Offline fallback
workbox.routing.setDefaultHandler(
  new workbox.strategies.NetworkOnly()
)

// ============================================================
//  KART — Mini E-Commerce PWA
//  service-worker.js — Caching & Offline Strategy
// ============================================================

const CACHE_NAME = 'kart-v2';
const STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  // Google Fonts (cached on first load)
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap',
];

// ---- INSTALL: Pre-cache static assets ----
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching static assets');
      return Promise.allSettled(
        STATIC_ASSETS.map(async (url) => {
          try {
            const req = new Request(url, {
              headers: { 'ngrok-skip-browser-warning': 'true' }
            });
            const res = await fetch(req);
            if (res.status === 200) {
              await cache.put(url, res);
            } else {
              console.warn('[SW] Failed to cache:', url, 'status:', res.status);
            }
          } catch (err) {
            console.warn('[SW] Failed to cache:', url, err);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Installation complete');
      return self.skipWaiting(); // Activate immediately
    })
  );
});

// ---- ACTIVATE: Clean old caches ----
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      )
    ).then(() => {
      console.log('[SW] Activation complete — clients claimed');
      return self.clients.claim(); // Take control immediately
    })
  );
});

// ---- FETCH: Cache-first for static, Network-first for dynamic ----
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and browser extensions
  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  // Strategy: Cache-first for same-origin static assets & fonts
  if (
    url.origin === self.location.origin ||
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com'
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Strategy: Network-first for everything else (APIs, external CDN)
  event.respondWith(networkFirst(request));
});

// ---- HELPER: ngrok bypass fetch ----
async function doFetch(request) {
  const headers = new Headers(request.headers);
  headers.set('ngrok-skip-browser-warning', 'true');
  const req = new Request(request.url, {
    method: request.method,
    headers: headers,
    mode: request.mode === 'navigate' ? 'cors' : request.mode,
    credentials: request.credentials,
    redirect: request.redirect
  });
  return fetch(req);
}

// ---- CACHE-FIRST Strategy ----
async function cacheFirst(request) {
  try {
    const cached = await caches.match(request);
    if (cached) {
      console.log('[SW] Cache hit:', request.url);
      return cached;
    }
    // Not in cache → fetch and store
    const response = await doFetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    console.warn('[SW] Cache-first fetch failed:', err);
    // Return offline fallback page
    const fallback = await caches.match('./index.html');
    return fallback || new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' } });
  }
}

// ---- NETWORK-FIRST Strategy ----
async function networkFirst(request) {
  try {
    const response = await doFetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    console.warn('[SW] Network failed, trying cache:', request.url);
    const cached = await caches.match(request);
    return cached || new Response('{"error":"offline"}', {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// ---- BACKGROUND SYNC (for future push notifications) ----
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-cart') {
    console.log('[SW] Background sync: cart');
    // In a real app, sync cart data to server here
  }
});

// ---- PUSH NOTIFICATIONS (skeleton) ----
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? { title: 'KART', body: 'New deals available!' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: './icons/icon-192.png',
      badge: './icons/icon-72.png',
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('./')
  );
});

console.log('[SW] Service Worker script loaded ✓');

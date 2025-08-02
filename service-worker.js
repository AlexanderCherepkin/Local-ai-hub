const CACHE_NAME = 'local-ai-hub-v3';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/css/main.min.css',
    '/css/style.min.css',
    '/css/nav-glass-theme.min.css',
    '/css/footer.min.css',
    '/css/icon-3d.min.css',
    '/css/aos.min.css',
    '/css/variability.min.css',
    '/css/header.min.css',
    '/css/about.min.css',
    '/css/demo.min.css',
    '/css/modal.min.css',
    '/css/feedback-modal.min.css',
    '/css/skeleton.min.css',
    '/css/preloader.min.css',
    '/css/animation.min.css',
    '/css/style-adaptyve.min.css',
    '/css/layout-fix.min.css',
    '/js/app.min.js',
    '/js/chat-widget.min.js',
    '/manifest.json',
    '/offline.html',
    '/lang/en.json',
    '/favicon/icon-192.png',
    '/favicon/icon-512.png'
];

// Установка: кэшируем все ресурсы
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      const results = await Promise.allSettled(
        URLS_TO_CACHE.map(async (url) => {
          try {
            const request = new Request(url, { mode: 'same-origin' });
            const response = await fetch(request);
            if (!response.ok) throw new Error(`❌ ${url} → ${response.status}`);
            await cache.put(url, response.clone());
            return true;
          } catch (error) {
            console.error('🔴 Ошибка при кэшировании:', url, error);
            return false;
          }
        })
      );
      console.info('✅ Закэшировано:', results.filter(r => r.status === 'fulfilled').length);
    })
  );
  self.skipWaiting();
});


// Активация: очищаем старый кэш
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Обработка fetch-запросов
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/offline.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          return networkResponse;
        })
        .catch((error) => {
          console.warn('⚠️ Ошибка загрузки из сети:', event.request.url, error);
          // Возвращаем Response-заглушку вместо undefined
          return new Response('⚠️ Resource unavailable offline', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain' }
          });
        });
    })
  );
});

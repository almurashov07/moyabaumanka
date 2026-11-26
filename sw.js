const CACHE='baumanka-nova-v310-smart-study';
const CORE=['./','./index.html','./styles.css?v=3100','./reborn.css?v=3100','./seed.js?v=3100','./app.js?v=3100','./horoscope.js?v=3100','./manifest.webmanifest','./icon-192.png','./icon-512.png','./chibis.jpeg','./siply.jpeg','./basmach.jpeg','./sych.jpeg','./shershavy.jpeg','./campus-art.jpg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('baumanka-nova-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 if(req.mode==='navigate'){event.respondWith(fetch(req).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy))}return response}).catch(()=>caches.open(CACHE).then(c=>c.match('./index.html'))));return}
 event.respondWith(caches.open(CACHE).then(c=>c.match(req)).then(hit=>hit||fetch(req).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(req,copy))}return response})));
});

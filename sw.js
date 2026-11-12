const CACHE='baumanka-nova-v20-3-nachert';
const CORE=['./','./index.html','./styles.css?v=2030','./reborn.css?v=2030','./seed.js?v=2030','./app.js?v=2030','./horoscope.js?v=2030','./manifest.webmanifest','./icon-192.png','./icon-512.png','./chibis.jpeg','./siply.jpeg','./basmach.jpeg','./sych.jpeg','./shershavy.jpeg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('baumanka-nova-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 if(req.mode==='navigate'){event.respondWith(fetch(req).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy))}return response}).catch(()=>caches.match('./index.html')));return}
 event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(req,copy))}return response})));
});

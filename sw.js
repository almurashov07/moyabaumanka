const CACHE='baumanka-nova-v18-1';
const CORE=['./','./index.html','./styles.css?v=181','./seed.js?v=181','./app.js?v=181','./horoscope.js?v=181','./manifest.webmanifest','./icon-192.png','./icon-512.png','./skins/bratva/chibis.jpeg','./skins/bratva/siply.jpeg','./skins/bratva/basmach.jpeg','./skins/bratva/sych.jpeg','./skins/bratva/shershavy.jpeg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('baumanka-nova-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 if(req.mode==='navigate'){event.respondWith(fetch(req).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy))}return response}).catch(()=>caches.match('./index.html')));return}
 event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(req,copy))}return response})));
});

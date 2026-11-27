const CACHE='baumanka-nova-v300-bmstu-4013';
const CORE=['./','./index.html','./styles.css?v=4013','./features.css?v=4013','./seed.js?v=4013','./app.js?v=4013','./horoscope.js?v=4013','./manifest.webmanifest','./lens.png','./icon-192.png','./icon-512.png','./chibis.jpeg','./siply.jpeg','./basmach.jpeg','./sych.jpeg','./shershavy.jpeg','./campus-art.jpg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('baumanka-nova-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 if(req.mode==='navigate'){event.respondWith(fetch(req).then(response=>{if(response.ok&&['./','./index.html'].some(path=>new URL(path,self.registration.scope).href===req.url)){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(c=>c.put('./index.html',copy)))}return response}).catch(()=>caches.open(CACHE).then(c=>c.match('./index.html'))));return}
 event.respondWith(caches.open(CACHE).then(c=>c.match(req)).then(hit=>hit||fetch(req).then(response=>{if(response.ok&&CORE.some(path=>new URL(path,self.registration.scope).href===req.url)){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(c=>c.put(req,copy)))}return response})));
});

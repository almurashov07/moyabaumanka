const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const scope = 'https://example.test/user/repository/';
const events = {};
const entries = new Map();
const cache = {
 async addAll(urls) {
   for (const relative of urls) {
     const file = relative.split('?')[0].replace(/^\.\//, '') || 'index.html';
     entries.set(new URL(relative,scope).href, new Response(fs.readFileSync(path.join(root,file))));
   }
 },
 async match(request) { return entries.get(new URL(request.url || request,scope).href)?.clone(); }
};
const worker = {
 registration:{scope}, location:new URL(scope), clients:{claim(){}}, skipWaiting(){},
 addEventListener(name, handler){ events[name]=handler; }
};
const stores = new Set(['baumanka-nova-v300-bmstu-400','another-cache']);
const caches = {open:async key=>{stores.add(key);return cache},keys:async()=>[...stores],delete:async key=>stores.delete(key)};
vm.runInNewContext(fs.readFileSync(path.join(root,'sw.js'),'utf8'),{self:worker,caches,URL,fetch:async()=>{throw Error('offline')}});
(async()=>{
 await new Promise(resolve=>events.install({waitUntil:resolve}));
 await new Promise(resolve=>events.activate({waitUntil:resolve}));
 assert(stores.has('another-cache'));
 assert(!stores.has('baumanka-nova-v300-bmstu-400'));
 for(const [relative,mode,expected] of [['./','navigate','<html'],['./app.js?v=4020','cors','refreshHomeStatus'],['./styles.css?v=4020','cors','.native-live']]){
   const response=await new Promise(resolve=>events.fetch({request:{method:'GET',url:new URL(relative,scope).href,mode},respondWith:resolve}));
   assert((await response.text()).includes(expected),relative);
 }
 console.log('OK: precache files, offline navigation and resources under a GitHub Pages subpath');
})().catch(error=>{console.error(error);process.exitCode=1});

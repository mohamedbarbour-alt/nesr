// النسر الذهبي — Service Worker: يفتح التطبيق حتى بدون نت، والتحديثات من الشبكة أولاً
const C='nesr-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(C).then(k=>k.put('index',c));return res;}).catch(()=>caches.match('index')));
    return;
  }
  if(r.url.includes('cdnjs.cloudflare.com')){
    e.respondWith(caches.open(C).then(async k=>{const m=await k.match(r);if(m)return m;const res=await fetch(r);k.put(r,res.clone());return res;}));
  }
});

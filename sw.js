/* bản 146 — trang: mạng trước (luôn lấy bản mới), hình/phim: bộ nhớ trước (chơi được khi mất mạng) */
const C='xuong-146';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png'])))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&!k.startsWith('xuong-media')).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin||e.request.headers.has('range'))return;
 if(/\/(img|_blob)\//.test(u.pathname)){e.respondWith(caches.open('xuong-media').then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(n.ok&&n.status===200)c.put(e.request,n.clone());return n}))));return}
 e.respondWith(fetch(e.request).then(n=>{const k=n.clone();caches.open(C).then(c=>c.put(e.request,k));return n}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))))});

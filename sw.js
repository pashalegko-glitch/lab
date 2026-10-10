const V="lab-v3";
const CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png","u2netp-graph.json","u2netp.b64.txt","https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;
  const u=new URL(r.url);
  const page=r.mode==="navigate"||u.pathname.endsWith("/")||u.pathname.endsWith("index.html");
  if(page){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put(r,c));return res}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))));return}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok||res.type==="opaque"){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res})));
});

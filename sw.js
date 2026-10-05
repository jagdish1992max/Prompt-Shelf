var CACHE="promptwala-v2";
var FILES=["./","index.html","character.jpg","icon-192.png","gen.js","potd.js","fest.js","pwa.js","analytics.js"];
for(var i=1;i<=16;i++)FILES.push("prompts"+i+".js");
self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE).then(function(c){return Promise.all(FILES.map(function(f){return c.add(f).catch(function(){})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==CACHE}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
  var r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(CACHE).then(function(c){c.put(r,cp)});return res}).catch(function(){return caches.match(r).then(function(m){return m||caches.match("index.html")})}));
});

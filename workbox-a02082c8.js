define(["exports"],(function(e){"use strict";try{self["workbox:core:7.0.0"]&&_()}catch(e){}class t extends Error{constructor(e,t){super(((e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s})(e,t)),this.name=e,this.details=t}}try{self["workbox:routing:7.0.0"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}setCatchHandler(e){this.catchHandler=s(e)}}class r extends n{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class a{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:r,route:a}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let i=a&&a.handler;const c=e.method;if(!i&&this.i.has(c)&&(i=this.i.get(c)),!i)return;let o;try{o=i.handle({url:s,request:e,event:t,params:r})}catch(e){o=Promise.reject(e)}const h=a&&a.catchHandler;return o instanceof Promise&&(this.o||h)&&(o=o.catch((async n=>{if(h)try{return await h.handle({url:s,request:e,event:t,params:r})}catch(e){e instanceof Error&&(n=e)}if(this.o)return this.o.handle({url:s,request:e,event:t});throw n}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const r=this.t.get(s.method)||[];for(const a of r){let r;const i=a.match({url:e,sameOrigin:t,request:s,event:n});if(i)return r=i,(Array.isArray(r)&&0===r.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(r=void 0),{route:a,params:r}}return{}}setDefaultHandler(e,t="GET"){this.i.set(t,s(e))}setCatchHandler(e){this.o=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let i;const c=()=>(i||(i=new a,i.addFetchListener(),i.addCacheListener()),i);function o(e,s,a){let i;if("string"==typeof e){const t=new URL(e,location.href);i=new n((({url:e})=>e.href===t.href),s,a)}else if(e instanceof RegExp)i=new r(e,s,a);else if("function"==typeof e)i=new n(e,s,a);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});i=e}return c().registerRoute(i),i}const h={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},l=e=>[h.prefix,e,h.suffix].filter((e=>e&&e.length>0)).join("-"),u=e=>e||l(h.precache);function f(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class d{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const p=new Set;try{self["workbox:strategies:7.0.0"]&&_()}catch(e){}function w(e){return"string"==typeof e?new Request(e):e}class g{constructor(e,t){this.h={},Object.assign(this,t),this.event=t.event,this.u=e,this.l=new d,this.p=[],this.R=[...e.plugins],this.m=new Map;for(const e of this.R)this.m.set(e,{});this.event.waitUntil(this.l.promise)}async fetch(e){const{event:s}=this;let n=w(e);if("navigate"===n.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const r=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))n=await e({request:n.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const a=n.clone();try{let e;e=await fetch(n,"navigate"===n.mode?void 0:this.u.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:a,response:e});return e}catch(e){throw r&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:r.clone(),request:a.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=w(e);let s;const{cacheName:n,matchOptions:r}=this.u,a=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},r),{cacheName:n});s=await caches.match(a,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:n,matchOptions:r,cachedResponse:s,request:a,event:this.event})||void 0;return s}async cachePut(e,s){const n=w(e);await new Promise((e=>setTimeout(e,0)));const r=await this.getCacheKey(n,"write");if(!s)throw new t("cache-put-with-no-response",{url:(a=r.url,new URL(String(a),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var a;const i=await this.v(s);if(!i)return!1;const{cacheName:c,matchOptions:o}=this.u,h=await self.caches.open(c),l=this.hasCallback("cacheDidUpdate"),u=l?await async function(e,t,s,n){const r=f(t.url,s);if(t.url===r)return e.match(t,n);const a=Object.assign(Object.assign({},n),{ignoreSearch:!0}),i=await e.keys(t,a);for(const t of i)if(r===f(t.url,s))return e.match(t,n)}(h,r.clone(),["__WB_REVISION__"],o):null;try{await h.put(r,l?i.clone():i)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of p)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:c,oldResponse:u,newResponse:i.clone(),request:r,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this.h[s]){let n=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))n=w(await e({mode:t,request:n,event:this.event,params:this.params}));this.h[s]=n}return this.h[s]}hasCallback(e){for(const t of this.u.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this.u.plugins)if("function"==typeof t[e]){const s=this.m.get(t),n=n=>{const r=Object.assign(Object.assign({},n),{state:s});return t[e](r)};yield n}}waitUntil(e){return this.p.push(e),e}async doneWaiting(){let e;for(;e=this.p.shift();)await e}destroy(){this.l.resolve(null)}async v(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class y{constructor(e={}){this.cacheName=(e=>e||l(h.runtime))(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,r=new g(this,{event:t,request:s,params:n}),a=this.q(r,s,t);return[a,this.U(a,r,s,t)]}async q(e,s,n){let r;await e.runCallbacks("handlerWillStart",{event:n,request:s});try{if(r=await this.L(s,e),!r||"error"===r.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const a of e.iterateCallbacks("handlerDidError"))if(r=await a({error:t,event:n,request:s}),r)break;if(!r)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))r=await t({event:n,request:s,response:r});return r}async U(e,t,s,n){let r,a;try{r=await e}catch(a){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:r}),await t.doneWaiting()}catch(e){e instanceof Error&&(a=e)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:r,error:a}),t.destroy(),a)throw a}}function m(e,t){const s=t();return e.waitUntil(s),s}try{self["workbox:precaching:7.0.0"]&&_()}catch(e){}function R(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const r=new URL(n,location.href),a=new URL(n,location.href);return r.searchParams.set("__WB_REVISION__",s),{cacheKey:r.href,url:a.href}}class v{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class b{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._=e}}let q,U;class C extends y{constructor(e={}){e.cacheName=u(e.cacheName),super(e),this.C=!1!==e.fallbackToNetwork,this.plugins.push(C.copyRedirectedCacheableResponsesPlugin)}async L(e,t){return await t.cacheMatch(e)||(t.event&&"install"===t.event.type?await this.O(e,t):await this.N(e,t))}async N(e,s){let n;const r=s.params||{};if(!this.C)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{const t=r.integrity,a=e.integrity,i=!a||a===t;n=await s.fetch(new Request(e,{integrity:"no-cors"!==e.mode?a||t:void 0})),t&&i&&"no-cors"!==e.mode&&(this.k(),await s.cachePut(e,n.clone()))}return n}async O(e,s){this.k();const n=await s.fetch(e);if(!await s.cachePut(e,n.clone()))throw new t("bad-precaching-response",{url:e.url,status:n.status});return n}k(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==C.copyRedirectedCacheableResponsesPlugin&&(n===C.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);0===t?this.plugins.push(C.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}C.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},C.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await async function(e,s){let n=null;if(e.url&&(n=new URL(e.url).origin),n!==self.location.origin)throw new t("cross-origin-copy-response",{origin:n});const r=e.clone(),a={headers:new Headers(r.headers),status:r.status,statusText:r.statusText},i=s?s(a):a,c=function(){if(void 0===q){const e=new Response("");if("body"in e)try{new Response(e.body),q=!0}catch(e){q=!1}q=!1}return q}()?r.body:await r.blob();return new Response(c,i)}(e):e};class L{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this.K=new Map,this.T=new Map,this.W=new Map,this.u=new C({cacheName:u(e),plugins:[...t,new b({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.u}precache(e){this.addToCacheList(e),this.j||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.j=!0)}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:r}=R(n),a="string"!=typeof n&&n.revision?"reload":"default";if(this.K.has(r)&&this.K.get(r)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.K.get(r),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.W.has(e)&&this.W.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:r});this.W.set(e,n.integrity)}if(this.K.set(r,e),this.T.set(r,a),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return m(e,(async()=>{const t=new v;this.strategy.plugins.push(t);for(const[t,s]of this.K){const n=this.W.get(s),r=this.T.get(t),a=new Request(t,{integrity:n,cache:r,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:a,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(e){return m(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this.K.values()),n=[];for(const r of t)s.has(r.url)||(await e.delete(r),n.push(r.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this.K}getCachedURLs(){return[...this.K.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.K.get(t.href)}getIntegrityForCacheKey(e){return this.W.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}const k=()=>(U||(U=new L),U);class K extends n{constructor(e,t){super((({request:s})=>{const n=e.getURLsToCacheKeys();for(const r of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:r}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(a,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:a});for(const t of e)yield t.href}}(s.url,t)){const t=n.get(r);if(t)return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}),e.strategy)}}e.CacheFirst=class extends y{async L(e,s){let n,r=await s.cacheMatch(e);if(!r)try{r=await s.fetchAndCachePut(e)}catch(e){e instanceof Error&&(n=e)}if(!r)throw new t("no-response",{url:e.url,error:n});return r}},e.clientsClaim=function(){self.addEventListener("activate",(()=>self.clients.claim()))},e.precacheAndRoute=function(e,t){!function(e){k().precache(e)}(e),function(e){const t=k();o(new K(t,e))}(t)},e.registerRoute=o}));
//# sourceMappingURL=maps/workbox-a02082c8.js.map

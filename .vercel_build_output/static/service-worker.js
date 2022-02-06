const timestamp = 1644123978325;
const build = [
  "/_app/start-94b82b9e.js",
  "/_app/pages/__layout.svelte-bb3294ff.js",
  "/_app/assets/pages/__layout.svelte-6e277012.css",
  "/_app/error.svelte-c8e21f42.js",
  "/_app/pages/index.svelte-56aab725.js",
  "/_app/assets/pages/index.svelte-7e8eb9c2.css",
  "/_app/pages/saved-queries.svelte-0886fccb.js",
  "/_app/assets/pages/saved-queries.svelte-170e4e5f.css",
  "/_app/pages/recipes.svelte-a596f53f.js",
  "/_app/assets/pages/recipes.svelte-698adbdb.css",
  "/_app/chunks/vendor-8f340f4c.js",
  "/_app/chunks/singletons-a6a7384f.js",
  "/_app/chunks/queryToShare-9fd243eb.js",
  "/_app/chunks/generateAndGo-1cffa812.js",
  "/_app/chunks/SavedQueriesList-e003abe1.js",
  "/_app/assets/SavedQueriesList-d77e6f70.css",
  "/_app/chunks/SavedQuery-53e8228c.js"
];
const files = [
  "/favicon.png",
  "/logo_192.png",
  "/logo_512.png",
  "/manifest.json",
  "/robots.txt"
];
const worker = self;
const FILES = `cache${timestamp}`;
const to_cache = build.concat(files);
const staticAssets = new Set(to_cache);
worker.addEventListener("install", (event) => {
  event.waitUntil(caches.open(FILES).then((cache) => cache.addAll(to_cache)).then(() => {
    worker.skipWaiting();
  }));
});
worker.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then(async (keys) => {
    for (const key of keys) {
      if (key !== FILES)
        await caches.delete(key);
    }
    worker.clients.claim();
  }));
});
async function fetchAndCache(request) {
  const cache = await caches.open(`offline${timestamp}`);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    const response = await cache.match(request);
    if (response)
      return response;
    throw err;
  }
}
worker.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || event.request.headers.has("range"))
    return;
  const url = new URL(event.request.url);
  const isHttp = url.protocol.startsWith("http");
  const isDevServerRequest = url.hostname === self.location.hostname && url.port !== self.location.port;
  const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
  const skipBecauseUncached = event.request.cache === "only-if-cached" && !isStaticAsset;
  if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
    event.respondWith((async () => {
      const cachedAsset = isStaticAsset && await caches.match(event.request);
      return cachedAsset || fetchAndCache(event.request);
    })());
  }
});

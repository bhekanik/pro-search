const timestamp = 1651156055381;
const build = [
  "/_app/start-90b254da.js",
  "/_app/pages/__layout.svelte-1922302e.js",
  "/_app/assets/pages/__layout.svelte-0bf054f3.css",
  "/_app/error.svelte-1468afc0.js",
  "/_app/pages/index.svelte-302aec2e.js",
  "/_app/assets/pages/index.svelte-bd8536ff.css",
  "/_app/pages/saved-queries.svelte-20e79f48.js",
  "/_app/assets/pages/saved-queries.svelte-170e4e5f.css",
  "/_app/pages/recipes.svelte-c8513866.js",
  "/_app/assets/pages/recipes.svelte-698adbdb.css",
  "/_app/chunks/vendor-739188d0.js",
  "/_app/chunks/singletons-d1fb5791.js",
  "/_app/chunks/supabaseClient-f98d745b.js",
  "/_app/chunks/generateQueryUrl-359b1f52.js",
  "/_app/chunks/Protected-cbec64e8.js",
  "/_app/chunks/SavedQueriesList-f8d6be83.js",
  "/_app/assets/SavedQueriesList-cb9d0b05.css",
  "/_app/chunks/SavedQuery-7c294e90.js"
];
const files = [
  "/OG.png",
  "/OG.svg",
  "/apple-touch-icon.png",
  "/favicon.png",
  "/logo_512.png",
  "/opensearch.xml",
  "/robots.txt",
  "/site.webmanifest"
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

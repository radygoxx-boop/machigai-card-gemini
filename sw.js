// まちがいカード service worker
// アプリを更新したら、この番号を上げてください（例: v2）
const CACHE = "machigai-card-v4";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

const putCache = (req, res) => {
  if (res && (res.ok || res.type === "opaque")) {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(req, copy));
  }
  return res;
};

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // ページ本体: ネット優先（更新がすぐ届く）、オフラインならキャッシュ
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(res => putCache("./index.html", res)).catch(() => caches.match("./index.html"))
    );
    return;
  }
  // 同じサイトのファイルとGoogle Fonts: キャッシュ優先
  if (url.origin === location.origin || url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => putCache(req, res))));
  }
});

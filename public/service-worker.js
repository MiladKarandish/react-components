const cacheName = "v1";

const cacheClone = async (e) => {
  const res = await fetch(e.request);
  const resClone = res.clone();

  const cache = await caches.open(cacheName);
  await cache.put(e.request, resClone);
  return res;
};

const fetchEvent = () => {
  self.addEventListener("fetch", (e) => {
    console.log(e.request.url.includes("_next"));
    if (
      e.request.url === "https://jsonplaceholder.typicode.com/todos" ||
      e.request.url.includes("_next")
    ) {
      e.respondWith(
        cacheClone(e)
          .catch(() => caches.match(e.request))
          .then((res) => res)
      );
    }
  });
};

fetchEvent();

/* eslint-env serviceworker */
/* global clients */
// Service Worker for AicardLiff PWA
const CACHE_NAME = "aicard-liff-v1";
const urlsToCache = [
  "/",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/manifest.json",
  "/vite.svg",
];

// 安裝事件 - 緩存資源
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching files");
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log("Service Worker: Skip waiting");
        return self.skipWaiting();
      })
  );
});

// 激活事件 - 清理舊緩存
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("Service Worker: Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("Service Worker: Claiming clients");
        return self.clients.claim();
      })
  );
});

// 攔截請求 - 提供緩存優先策略
self.addEventListener("fetch", (event) => {
  // 檢查是否為開發環境的特殊資源
  const isDevelopmentResource =
    event.request.url.includes("@vite/client") ||
    event.request.url.includes("@react-refresh") ||
    event.request.url.includes("__vite_ping") ||
    event.request.url.includes("node_modules/.vite") ||
    event.request.url.includes("/@fs/") ||
    event.request.url.includes("/@id/") ||
    (event.request.url.includes("localhost") &&
      (event.request.url.includes("?import") ||
        event.request.url.includes("?t="))) ||
    (event.request.url.includes("/src/") &&
      event.request.url.includes("localhost:5173"));

  // 如果是開發環境資源，直接通過不攔截
  if (isDevelopmentResource) {
    return;
  }

  // 只攔截同源請求和靜態資源
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          // 如果有緩存，返回緩存
          if (response) {
            return response;
          }

          // 從網路獲取，並處理錯誤
          return fetch(event.request)
            .then((networkResponse) => {
              // 檢查響應是否有效
              if (
                !networkResponse ||
                networkResponse.status !== 200 ||
                networkResponse.type !== "basic"
              ) {
                return networkResponse;
              }

              // 克隆響應以便緩存
              const responseToCache = networkResponse.clone();

              // 只緩存靜態資源
              if (
                event.request.url.includes("/assets/") ||
                event.request.url.includes(".js") ||
                event.request.url.includes(".css") ||
                event.request.url.includes(".svg")
              ) {
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              }

              return networkResponse;
            })
            .catch((error) => {
              console.log(
                "Service Worker: Fetch failed for",
                event.request.url,
                error
              );

              // 對於 HTML 頁面，返回緩存的首頁或離線頁面
              if (event.request.destination === "document") {
                return (
                  caches.match("/") ||
                  new Response("離線模式，請檢查網路連接", {
                    status: 503,
                    statusText: "Service Unavailable",
                  })
                );
              }

              // 對於其他資源，返回錯誤
              return new Response("Network error occurred", {
                status: 408,
                statusText: "Request Timeout",
              });
            });
        })
        .catch((error) => {
          console.error("Service Worker: Cache match failed", error);
          return fetch(event.request).catch(() => {
            return new Response("Service Worker error", {
              status: 503,
              statusText: "Service Unavailable",
            });
          });
        })
    );
  }
});

// 推送通知事件
self.addEventListener("push", (event) => {
  console.log("Service Worker: Push event received");

  const options = {
    body: event.data ? event.data.text() : "AiCard 有新消息！",
    icon: "/vite.svg",
    badge: "/vite.svg",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "查看詳情",
        icon: "/vite.svg",
      },
      {
        action: "close",
        title: "關閉",
        icon: "/vite.svg",
      },
    ],
    requireInteraction: false,
    tag: "aicard-notification",
  };

  event.waitUntil(self.registration.showNotification("AicardLiff", options));
});

// 通知點擊事件
self.addEventListener("notificationclick", (event) => {
  console.log("Service Worker: Notification click received");

  event.notification.close();

  if (event.action === "explore") {
    // 打開應用到特定頁面
    event.waitUntil(clients.openWindow("/"));
  } else if (event.action === "close") {
    // 只關閉通知，不做其他操作
    console.log("Service Worker: Notification dismissed");
  } else {
    // 默認行為：打開應用
    event.waitUntil(
      clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clientList) => {
          // 如果已有窗口打開，聚焦到該窗口
          for (let i = 0; i < clientList.length; i++) {
            const client = clientList[i];
            if (client.url === "/" && "focus" in client) {
              return client.focus();
            }
          }
          // 如果沒有窗口打開，打開新窗口
          if (clients.openWindow) {
            return clients.openWindow("/");
          }
        })
    );
  }
});

// 通知關閉事件
self.addEventListener("notificationclose", (event) => {
  console.log("Service Worker: Notification was closed", event);
});

// 後台同步事件（用於離線操作）
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    console.log("Service Worker: Background sync");
    event.waitUntil(
      // 在這裡處理離線時的操作
      Promise.resolve()
    );
  }
});

// 消息事件（與主線程通信）
self.addEventListener("message", (event) => {
  console.log("Service Worker: Message received", event.data);

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "GET_VERSION") {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }

  if (event.data && event.data.type === "SEND_NOTIFICATION") {
    const notificationData = event.data.payload;
    self.registration.showNotification(notificationData.title || "AicardLiff", {
      body: notificationData.body || "您有新的消息",
      icon: notificationData.icon || "/vite.svg",
      badge: "/vite.svg",
      tag: notificationData.tag || "custom-notification",
      data: notificationData.data || {},
    });
  }
});

// 錯誤處理
self.addEventListener("error", (event) => {
  console.error("Service Worker: Error occurred", event.error);
});

// 未處理的拒絕事件
self.addEventListener("unhandledrejection", (event) => {
  console.error("Service Worker: Unhandled rejection", event.reason);
  event.preventDefault();
});

console.log("Service Worker: Loaded successfully");

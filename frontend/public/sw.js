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
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 如果有緩存，返回緩存，否則從網路獲取
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// 推送通知事件
self.addEventListener("push", (event) => {
  console.log("Service Worker: Push event received");

  const options = {
    body: event.data ? event.data.text() : "AicardLiff 有新消息！",
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

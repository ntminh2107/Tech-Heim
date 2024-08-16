self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
  event.waitUntil(self.clients.claim());
});

let fetchInterval;

// self.addEventListener("message", async (event) => {
//   const { id } = event.data;
//   console.log(id);
//   try {
//     await fetchNotificationID(id);

//     fetchInterval = setInterval(() => {
//       fetchNotificationID(id);
//     }, 3000);
//   } catch {
//     console.error("fetching data not found:", error);
//   }
// });

// async function fetchNotificationID(id) {
//   try {
//     const res = await fetch(`http://localhost:3000/notification/${id}`);
//     console.log(res.status);
//     console.log(`http://localhost:3000/notification/${id}`);
//     if (res.ok) {
//       const data = await res.json();
//       console.log(data);
//       const { title, message, userIDs } = data;

//       console.log(
//         `Received message from client:", ${title}, ${message}, ${userIDs.id}`
//       );

//       const allClients = await self.clients.matchAll({
//         includeUncontrolled: true,
//         type: "window",
//       });
//       allClients.forEach((client) => {
//         client.postMessage({ title, message, userIDs });
//       });

//       self.registration.showNotification(title, {
//         body: message,
//         icon: "/assets/icons/device/audio_icon.svg",
//         tag: id,
//       });
//       clearInterval(fetchInterval);
//     } else {
//       console.error("cannot catch message:", res.statusText);
//       clearInterval(fetchInterval);
//     }
//   } catch (error) {
//     console.error("Error fetching notification data:", error);
//     clearInterval(fetchInterval);
//   }
// }

self.addEventListener("message", async (event) => {
  const { id } = event.data;
  console.log("check push", id);
  try {
    const res = await fetch(`http://localhost:3000/notification/${id}`);
    const data = await res.json();
    const { title, message, userIDs } = data;
    event.waitUntil(
      self.registration.showNotification(title, {
        body: message,
        icon: "/assets/icons/device/audio_icon.svg",
        tag: id,
      })
    );
  } catch (err) {
    console.error("some thing happens", err);
  }
});

self.addEventListener("notificationclick", (event) => {
  const eventAction = event.action;
  if (eventAction !== "explore") {
    return;
  }
  const url = "https://developer.mozilla.org/en-US/docs/Web/API/Push_API";
  console.log("message event fired! event action is:", `'${eventAction}'`);
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

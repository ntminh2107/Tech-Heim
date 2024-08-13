self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
  event.waitUntil(self.clients.claim());
});

let fetchInterval;

self.addEventListener("message", async (event) => {
  const { id } = event.data;
  console.log(id);
  try {
    await fetchNotificationID(id);

    fetchInterval = setInterval(() => {
      fetchNotificationID(id);
    }, 3000);
  } catch {
    console.error("fetching data not found:", error);
  }
});

async function fetchNotificationID(id) {
  try {
    const res = await fetch(`http://localhost:3000/notification/${id}`);
    console.log(res.status);
    console.log(`http://localhost:3000/notification/${id}`);
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      const { title, message, userIDs } = data;

      console.log(
        `Received message from client:", ${title}, ${message}, ${userIDs.id}`
      );

      const allClients = await self.clients.matchAll({
        includeUncontrolled: true,
        type: "window",
      });
      allClients.forEach((client) => {
        client.postMessage({ title, message, userIDs });
      });

      self.registration.showNotification(title, {
        body: message,
        icon: "/assets/icons/device/audio_icon.svg",
        tag: id,
      });
      clearInterval(fetchInterval);
    } else {
      console.error("cannot catch message:", res.statusText);
      clearInterval(fetchInterval);
    }
  } catch (error) {
    console.error("Error fetching notification data:", error);
    clearInterval(fetchInterval);
  }
}

self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
});

self.addEventListener("message", (event) => {
  const { title, message, userIds } = event.data;
  console.log("Service Worker received message:", { title, message, userIds });

  // Gửi thông điệp đến tất cả các client
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      console.log("Sending message to client:", client, {
        title,
        message,
        userIds,
      }); // Debug log

      client.postMessage({ title, message, userIds });
    });
  });
});

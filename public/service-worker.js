self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
  self.skipWaiting(); // Activate worker immediately
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
  return self.clients.claim(); // Become available to all pages
});

// Listen for messages from the main script
self.addEventListener("message", (event) => {
  const { title, message, userIds } = event.data;
  console.log("Received message from client:", event.data);

  // Iterate over all clients (open windows/tabs)
  self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
    clients.forEach((client) => {
      // Send message to each client
      client.postMessage({ title, message, userIds });
    });
  });
});

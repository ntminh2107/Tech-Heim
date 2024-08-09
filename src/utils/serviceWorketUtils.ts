import { toast } from "react-toastify";

// Function to register the Service Worker and handle incoming messages
export const serviceWorkerUtils = async () => {
  // Check if the browser supports service workers
  if (!("serviceWorker" in navigator)) {
    console.warn("Service Worker is not supported in this browser.");
    return;
  }

  try {
    // Register the Service Worker
    const registration = await navigator.serviceWorker.register(
      "/service-worker.js"
    );
    console.log("Service Worker registered with scope:", registration.scope);

    // Listen for messages from the Service Worker
    navigator.serviceWorker.addEventListener("message", (event) => {
      const { title, message, userIds } = event.data;
      handleServiceWorkerMessage(title, message, userIds);
    });
  } catch (error) {
    console.error("Service Worker registration failed:", error);
  }
};

// Function to handle messages from the Service Worker
export const handleServiceWorkerMessage = (
  title: string,
  message: string,
  userIds: (string | number)[]
) => {
  const currentUser = localStorage.getItem("token") as string | number; // Assuming token contains user ID

  console.log("User IDs to notify:", userIds);

  // Check if the current user's ID is included in the list of user IDs
  if (userIds.includes(currentUser)) {
    console.log(`User ${currentUser} is in the list. Displaying toast.`);
    displayToastNotification(title, message);
  } else {
    console.warn(
      `No toast for ${currentUser}. Current user ID not found in notification list.`
    );
  }
};

// Function to display a toast notification
const displayToastNotification = (title: string, message: string) => {
  toast.success(`${title}: ${message}`, {
    position: "bottom-right",
    autoClose: 5000,
  });
};

// Function to send a message to the Service Worker
export const sendMessageToSW = (message: {
  title: string;
  message: string;
  userIds: (string | number)[];
}) => {
  // Check if there is an active service worker controller
  if (navigator.serviceWorker.controller) {
    console.log("Sending message to Service Worker:", message);
    navigator.serviceWorker.controller.postMessage(message);
  } else {
    console.warn("No active Service Worker controller found.");
  }
};

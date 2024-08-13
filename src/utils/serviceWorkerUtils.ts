import { toast } from "react-toastify";

export const initServiceWorker = async () => {
  if (!("serviceWorker" in navigator)) {
    console.warn("Service Worker is not supported in this browser.");
    return;
  }
  try {
    const registration = await navigator.serviceWorker.register(
      "/service-worker.js"
    );
    console.log("Service Worker registered with scope:", registration.scope);
  } catch (error) {
    console.error("Service Worker registration failed:", error);
  }
};

export const handleServiceWorkerMessage = (
  title: string,
  message: string,
  userIDs: { id: string | number }[]
) => {
  const currentUser = localStorage.getItem("token") as string | number;

  if (userIDs.some((user) => user.id === currentUser)) {
    console.log("User IDs to notify:", userIDs);
    console.log(`User ${currentUser} is in the list. Displaying toast.`);
    toast.success(`${title}: ${message}`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  } else {
    console.warn(
      `No toast for ${currentUser}. Current user ID not found in notification list.`
    );
  }
};

export const sendMessageToSW = (message: { id: string }) => {
  if (navigator.serviceWorker.controller) {
    console.log("Sending message to Service Worker:", message);
    navigator.serviceWorker.controller.postMessage(message);
  } else {
    console.warn("No active Service Worker controller found.");
  }
};

export const receiveMSG = async () => {
  navigator.serviceWorker.addEventListener("message", (event) => {
    const { title, message, userIDs } = event.data;
    console.log("pass", title, message, userIDs);
    handleServiceWorkerMessage(title, message, userIDs);
  });
};

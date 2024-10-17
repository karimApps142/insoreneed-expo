import { notify, remove } from "react-native-notificated";
import { NotificationsType } from "react-native-notificated/lib/typescript/types/config";

// Define a type for the notification metadata
type NotificationMetadata = {
  id: string;
};

// Store the current notification
let currentNotification: NotificationMetadata | null = null;

export const showNotification = (
  type: "success" | "warning" | "error",
  title: string,
  description?:string
) => {
  // Remove the existing notification if it exists
  if (currentNotification) {
    remove(currentNotification.id);
  }

  // Show the new notification
  currentNotification = notify(type, {
    params: {
      title,
      description
    },
  });
};

export const clearNotification = () => {
  if (currentNotification) {
    remove(currentNotification.id);
    currentNotification = null; // Reset the notification variable
  }
};

"use client";

import { useEffect, useState } from "react";
import { useNotificationContext } from "./NotificationContext";
import clsx from "clsx";

export default function NotificationBanner() {
  const { notification, clearNotification } = useNotificationContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setVisible(true);
      const timeout = setTimeout(() => {
        setVisible(false);
        clearNotification();
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [notification]);

  if (!notification || !visible) return null;

  const colors = {
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    info: "bg-blue-100 text-blue-800 border-blue-300",
  };

  return (
    <div
      className={clsx(
        "fixed top-4 right-4 z-50 border px-4 py-2 rounded shadow transition-all duration-300 max-w-sm",
        colors[notification.type || "info"]
      )}
    >
      {notification.message}
    </div>
  );
}

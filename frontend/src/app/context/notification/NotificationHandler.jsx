"use client";

import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function NotificationHandler({ accessToken }) {
  const stompClientRef = useRef(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!accessToken || stompClientRef.current) return;

    const socket = new SockJS("http://localhost:8080/ws/appointments", null, {
      withCredentials: false,
    });

    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`, // 🛡️ Передаём JWT
      },
      reconnectDelay: 100000,
      onConnect: () => {
        console.log("📡 WebSocket connected");
        // notifyPost(employeeId).then(
        //   console.log("post")
        // )
        stompClient.subscribe(`/topic/admin-notifications`, (message) => {
           const { title, body } = JSON.parse(message.body);

          setNotifications((prevNotifications) => [
            ...prevNotifications,
            { title, body, id: Date.now() },
          ]);

          // Автоматически удаляем уведомление через 5 секунд
          setTimeout(() => {
            setNotifications((prevNotifications) =>
              prevNotifications.filter((notification) => notification.id !== Date.now())
            );
          }, 1000000);



          if (Notification.permission === "granted") {
            new Notification(title, { body });

          } else {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                new Notification(title, { body });
              }
            });
          }
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;



    return () => {
      stompClient.deactivate();
      stompClientRef.current = null;
    };
  }, [accessToken]);

  return (
    <div id="notification-container">
      {notifications.map((notification) => (
        <div key={notification.id} className="notification flex justify-between gap-2">
          <div className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="58" height="60" fill="none" viewBox="0 0 58 60">
              <path fill="#C50" d="M12 24v9c0 .467-.103.927-.3 1.344L8.09 42h41.832l-3.616-7.656A3.145 3.145 0 0 1 46 33v-9c0-4.774-1.79-9.352-4.979-12.728C37.833 7.896 33.509 6 29.001 6c-4.51 0-8.834 1.896-12.022 5.272C13.791 14.648 12 19.226 12 24Zm5.667 24H3.5c-.483 0-.958-.13-1.38-.38a2.911 2.911 0 0 1-1.03-1.044 3.15 3.15 0 0 1-.122-2.92l5.366-11.364V24c0-6.365 2.388-12.47 6.639-16.97C17.223 2.528 22.989 0 29 0c6.012 0 11.777 2.529 16.028 7.03 4.25 4.5 6.639 10.605 6.639 16.97v8.292l5.366 11.364a3.149 3.149 0 0 1-.122 2.92 2.911 2.911 0 0 1-1.03 1.044c-.422.25-.898.38-1.38.38H40.333c0 3.183-1.195 6.235-3.32 8.485C34.89 58.735 32.006 60 29 60c-3.006 0-5.888-1.264-8.014-3.515-2.125-2.25-3.32-5.302-3.32-8.485Zm17 0H23.334c0 1.591.597 3.117 1.66 4.243C26.055 53.368 27.496 54 29 54c1.503 0 2.945-.632 4.007-1.757 1.063-1.126 1.66-2.652 1.66-4.243Z" />
            </svg>

          </div>
          <div>
            <strong>{notification.title}</strong>
            <p>{notification.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
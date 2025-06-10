package com.VetTies.service;

import com.VetTies.DTOs.NotificationMessage;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationWebSocketService {

    private final SimpMessagingTemplate messagingTemplate;

    public NotificationWebSocketService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendAdminNotification(NotificationMessage message) {
        // Отправляем на топик, который слушает админ на клиенте
        System.out.println(message);
        messagingTemplate.convertAndSend("/topic/admin-notifications", message);
    }
}
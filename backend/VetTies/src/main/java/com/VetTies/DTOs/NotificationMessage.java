package com.VetTies.DTOs;

public class NotificationMessage {
    private String title;
    private String body;

    public String getTitle() {
        return title;
    }

    public NotificationMessage setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getBody() {
        return body;
    }

    public NotificationMessage setBody(String body) {
        this.body = body;
        return this;
    }
}
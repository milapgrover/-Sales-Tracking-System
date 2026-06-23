package com.example.SalesTrackingBackEnd.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.SalesTrackingBackEnd.dto.NotificationResponse;

@Service
public class NotificationService {

    private final List<String> notifications =
            new ArrayList<>();

    public void sendLowStockNotification(
            String message) {

        notifications.add(message);

        System.out.println(
                "LOW STOCK ALERT : "+ message);
    }

    public List<NotificationResponse>
    getNotifications() {

        return notifications.stream()
                .map(message ->
                        NotificationResponse.builder().message(message).build())
                .toList();
    }
}
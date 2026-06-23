package com.example.SalesTrackingBackEnd.controller;

import com.example.SalesTrackingBackEnd.dto.NotificationResponse;
import com.example.SalesTrackingBackEnd.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin("*")
public class NotificationController {

    private final NotificationService
            notificationService;

    @GetMapping
    public List<NotificationResponse>
    getNotifications() {

        return notificationService
                .getNotifications();
    }
}
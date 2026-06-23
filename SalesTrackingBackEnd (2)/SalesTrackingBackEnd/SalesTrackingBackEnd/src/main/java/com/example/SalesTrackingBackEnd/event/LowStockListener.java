package com.example.SalesTrackingBackEnd.event;

import com.example.SalesTrackingBackEnd.entity.Product;
import com.example.SalesTrackingBackEnd.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LowStockListener {
    private final NotificationService notificationService;

    @Async
    @EventListener
    public void handleLowStockEvent(
            LowStockEvent event) {
           Product product = event.getProduct();
        String message ="Product : " + product.getProductName() + " is low in stock. Remaining quantity : " + product.getStockQuantity();
        
          notificationService.sendLowStockNotification(message);
    }
}
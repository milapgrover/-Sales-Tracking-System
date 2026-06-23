package com.example.SalesTrackingBackEnd.controller;

import com.example.SalesTrackingBackEnd.dto.OrderRequest;
import com.example.SalesTrackingBackEnd.dto.OrderResponse;
import com.example.SalesTrackingBackEnd.entity.SalesOrder;
import com.example.SalesTrackingBackEnd.service.SalesOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin("*")
public class SalesOrderController {

    private final SalesOrderService salesOrderService;

    @PostMapping
    public OrderResponse createOrder(
            @Valid @RequestBody OrderRequest request) {

        return salesOrderService.createOrder(request);
    }

    @GetMapping
    public List<SalesOrder> getAllOrders() {
    
        return salesOrderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public SalesOrder getOrderById(
            @PathVariable Long id) {

        return salesOrderService.getOrderById(id);
    }
}
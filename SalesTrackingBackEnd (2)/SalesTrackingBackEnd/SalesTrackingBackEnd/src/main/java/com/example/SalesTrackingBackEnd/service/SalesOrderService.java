package com.example.SalesTrackingBackEnd.service;

import com.example.SalesTrackingBackEnd.dto.OrderItemRequest;
import com.example.SalesTrackingBackEnd.dto.OrderRequest;
import com.example.SalesTrackingBackEnd.dto.OrderResponse;
import com.example.SalesTrackingBackEnd.entity.Product;
import com.example.SalesTrackingBackEnd.entity.SalesOrder;
import com.example.SalesTrackingBackEnd.entity.SalesOrderItem;
import com.example.SalesTrackingBackEnd.event.LowStockEvent;
import com.example.SalesTrackingBackEnd.exception.ProductNotFoundException;
import com.example.SalesTrackingBackEnd.repository.ProductRepository;
import com.example.SalesTrackingBackEnd.repository.SalesOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SalesOrderService {

    private final ProductRepository
            productRepository;

    private final SalesOrderRepository
            salesOrderRepository;

    private final InventoryService
            inventoryService;

    private final LowStockService
            lowStockService;

    private final ApplicationEventPublisher
            publisher;

    @Transactional
    public OrderResponse createOrder(
            OrderRequest request) {

        SalesOrder order =
                new SalesOrder();

        order.setCustomerName(
                request.getCustomerName());

        order.setOrderDate(
                LocalDateTime.now());

        List<SalesOrderItem> items =
                new ArrayList<>();

        double totalAmount = 0;

        for (OrderItemRequest itemRequest
                : request.getItems()) {

            Product product =
                    productRepository.findById(
                                    itemRequest.getProductId())
                            .orElseThrow(() ->
                                    new ProductNotFoundException(
                                            "Product not found"));

            inventoryService.reduceStock(
                    product,
                    itemRequest.getQuantity());

            SalesOrderItem item =
                    new SalesOrderItem();

            item.setProduct(product);
            item.setQuantity(
                    itemRequest.getQuantity());

            item.setPrice(
                    product.getUnitPrice());

            item.setSalesOrder(order);

            items.add(item);

            totalAmount +=
                    product.getUnitPrice()
                            * itemRequest.getQuantity();

            if (lowStockService
                    .isLowStock(product)) {

                publisher.publishEvent(
                        new LowStockEvent(
                                product));
            }
        }

        order.setItems(items);

        order.setTotalAmount(
                totalAmount);

        SalesOrder savedOrder =
                salesOrderRepository
                        .save(order);

        return OrderResponse.builder()
                .orderId(savedOrder.getId())
                .customerName(
                        savedOrder.getCustomerName())
                .totalAmount(totalAmount)
                .message(
                        "Order Created Successfully")
                .build();
    }

    public List<SalesOrder> getAllOrders() {

        return salesOrderRepository.findAll();
    }

    public SalesOrder getOrderById(
            Long id) {

        return salesOrderRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Order not found"));
    }
}
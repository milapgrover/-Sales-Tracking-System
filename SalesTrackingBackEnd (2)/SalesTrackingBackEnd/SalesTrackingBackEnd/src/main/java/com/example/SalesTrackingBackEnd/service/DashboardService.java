package com.example.SalesTrackingBackEnd.service;

import org.springframework.stereotype.Service;

import com.example.SalesTrackingBackEnd.dto.DashboardResponse;
import com.example.SalesTrackingBackEnd.entity.SalesOrder;
import com.example.SalesTrackingBackEnd.repository.ProductRepository;
import com.example.SalesTrackingBackEnd.repository.SalesOrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProductRepository
            productRepository;

    private final SalesOrderRepository
            salesOrderRepository;

    public DashboardResponse
    getDashboardSummary() {

        long totalProducts =
                        productRepository.count();

        long totalOrders =
                salesOrderRepository.count();

        double totalRevenue =
                salesOrderRepository.findAll().stream().mapToDouble(SalesOrder::getTotalAmount).sum();

        long lowStockProducts =
                  productRepository.findAll().stream()
        .filter(product ->product.getStockQuantity()<= product.getMinimumStock()).count();

        return DashboardResponse.builder().totalProducts(totalProducts).totalOrders(totalOrders)
        .totalRevenue(totalRevenue).lowStockProducts(lowStockProducts)
        .build();
    }
}
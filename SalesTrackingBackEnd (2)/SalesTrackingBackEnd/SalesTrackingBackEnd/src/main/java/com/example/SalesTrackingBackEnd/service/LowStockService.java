package com.example.SalesTrackingBackEnd.service;

import com.example.SalesTrackingBackEnd.entity.Product;
import org.springframework.stereotype.Service;

@Service
public class LowStockService {

    public boolean isLowStock(
            Product product) {

        return product.getStockQuantity()
                <= product.getMinimumStock();
    }
}
package com.example.SalesTrackingBackEnd.event;

import com.example.SalesTrackingBackEnd.entity.Product;

public class LowStockEvent {

    private final Product product;

    public LowStockEvent(Product product) {
        this.product = product;
    }

    public Product getProduct() {
        return product;
    }
}
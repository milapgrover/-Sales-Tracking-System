package com.example.SalesTrackingBackEnd.service;

import org.springframework.stereotype.Service;

import com.example.SalesTrackingBackEnd.entity.Product;
import com.example.SalesTrackingBackEnd.exception.InsufficientStockException;
import com.example.SalesTrackingBackEnd.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final ProductRepository productRepository;

    public void reduceStock(
            Product product,
            Integer quantity) {

        if(product.getStockQuantity()< quantity) 
        {

            throw new InsufficientStockException("Insufficient stock available");
        }

        product.setStockQuantity(
                product.getStockQuantity()- quantity);

        productRepository.save(product);
    }
}
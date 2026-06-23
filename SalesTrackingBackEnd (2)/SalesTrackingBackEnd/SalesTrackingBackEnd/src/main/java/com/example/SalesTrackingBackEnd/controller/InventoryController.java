package com.example.SalesTrackingBackEnd.controller;

import com.example.SalesTrackingBackEnd.dto.InventorySummaryResponse;
import com.example.SalesTrackingBackEnd.entity.Product;
import com.example.SalesTrackingBackEnd.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
@CrossOrigin("*")
public class InventoryController {

    private final ProductRepository productRepository;

    @GetMapping("/summary")
    public InventorySummaryResponse getSummary() {

        long totalProducts =
                productRepository.count();

        int totalStock =
                productRepository.findAll()
                        .stream()
                        .mapToInt(Product::getStockQuantity)
                        .sum();

        return InventorySummaryResponse
                .builder()
                .totalProducts(totalProducts)
                .totalStock(totalStock)
                .build();
    }

    @GetMapping("/low-stock")
    public List<Product> getLowStockProducts() {

        return productRepository.findAll()
                .stream()
                .filter(product ->
                        product.getStockQuantity()
                                <= product.getMinimumStock())
                .toList();
    }
}
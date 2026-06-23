package com.example.SalesTrackingBackEnd.controller;

import com.example.SalesTrackingBackEnd.dto.ProductRequest;
import com.example.SalesTrackingBackEnd.dto.ProductResponse;
import com.example.SalesTrackingBackEnd.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ProductResponse createProduct(
            @Valid @RequestBody ProductRequest request) {

        return productService.createProduct(request);
    }

    @GetMapping
    public List<ProductResponse> getAllProducts() {

        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ProductResponse getProductById(
            @PathVariable Long id) {

        return productService.getProductById(id);
    }

    @PutMapping("/{id}")
    public ProductResponse updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request) {

        return productService.updateProduct(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(
            @PathVariable Long id) {

        try {

            productService.deleteProduct(id);

            return ResponseEntity.ok(
                    "Product Deleted Successfully");

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body(e.getMessage());

        }
    }
}
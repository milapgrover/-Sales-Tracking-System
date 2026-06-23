package com.example.SalesTrackingBackEnd.service;

import com.example.SalesTrackingBackEnd.dto.ProductRequest;
import com.example.SalesTrackingBackEnd.dto.ProductResponse;
import com.example.SalesTrackingBackEnd.entity.Product;
import com.example.SalesTrackingBackEnd.exception.ProductNotFoundException;
import com.example.SalesTrackingBackEnd.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public ProductResponse createProduct(
            ProductRequest request) {

        Product product = Product.builder()
                .productName(request.getProductName())
                .stockQuantity(request.getStockQuantity())
                .minimumStock(request.getMinimumStock())
                .unitPrice(request.getUnitPrice())
                .build();

        Product savedProduct =
                productRepository.save(product);

        return mapToResponse(savedProduct);
    }

    public List<ProductResponse> getAllProducts() {

        return productRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public ProductResponse getProductById(
            Long id) {

        Product product =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new ProductNotFoundException(
                                        "Product not found with id : "
                                                + id));

        return mapToResponse(product);
    }

    public ProductResponse updateProduct(
            Long id,
            ProductRequest request) {

        Product product =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new ProductNotFoundException(
                                        "Product not found with id : "
                                                + id));

        product.setProductName(
                request.getProductName());

        product.setStockQuantity(
                request.getStockQuantity());

        product.setMinimumStock(
                request.getMinimumStock());

        product.setUnitPrice(
                request.getUnitPrice());

        Product updatedProduct =
                productRepository.save(product);

        return mapToResponse(updatedProduct);
    }

    public void deleteProduct(
            Long id) {

        Product product =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new ProductNotFoundException(
                                        "Product not found with id : "
                                                + id));

        productRepository.delete(product);
    }

    private ProductResponse mapToResponse(
            Product product) {

        return ProductResponse.builder()
                .id(product.getId())
                .productName(product.getProductName())
                .stockQuantity(product.getStockQuantity())
                .minimumStock(product.getMinimumStock())
                .unitPrice(product.getUnitPrice())
                .build();
    }
}
package com.example.SalesTrackingBackEnd.repository;

import com.example.SalesTrackingBackEnd.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository
        extends JpaRepository<Product, Long> {

    List<Product> findByStockQuantityLessThanEqual(
            Integer stockQuantity);
}
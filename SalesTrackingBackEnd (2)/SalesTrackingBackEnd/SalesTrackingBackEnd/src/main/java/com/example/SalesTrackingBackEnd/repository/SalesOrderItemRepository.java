package com.example.SalesTrackingBackEnd.repository;

import com.example.SalesTrackingBackEnd.entity.SalesOrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesOrderItemRepository
        extends JpaRepository<SalesOrderItem, Long> {
}
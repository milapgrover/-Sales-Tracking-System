package com.example.SalesTrackingBackEnd.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {

    private Long id;

    private String productName;

    private Integer stockQuantity;

    private Integer minimumStock;

    private Double unitPrice;
}
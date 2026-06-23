package com.example.SalesTrackingBackEnd.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventorySummaryResponse {

    private Long totalProducts;

    private Integer totalStock;
}
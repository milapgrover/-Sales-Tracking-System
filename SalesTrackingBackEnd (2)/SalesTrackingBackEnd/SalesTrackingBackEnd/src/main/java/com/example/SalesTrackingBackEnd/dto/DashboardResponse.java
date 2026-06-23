package com.example.SalesTrackingBackEnd.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {

    private Long totalProducts;

    private Long totalOrders;

    private Double totalRevenue;

    private Long lowStockProducts;
}
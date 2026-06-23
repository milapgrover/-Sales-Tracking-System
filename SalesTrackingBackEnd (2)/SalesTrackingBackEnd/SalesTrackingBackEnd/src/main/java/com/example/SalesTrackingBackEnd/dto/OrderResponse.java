package com.example.SalesTrackingBackEnd.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {

    private Long orderId;

    private String customerName;

    private Double totalAmount;

    private String message;
}
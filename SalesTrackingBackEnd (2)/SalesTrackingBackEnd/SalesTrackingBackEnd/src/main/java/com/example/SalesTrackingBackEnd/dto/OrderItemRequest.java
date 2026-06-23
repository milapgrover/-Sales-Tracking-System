package com.example.SalesTrackingBackEnd.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemRequest {

    @NotNull
    private Long productId;

    @NotNull
    @Positive
    private Integer quantity;
}
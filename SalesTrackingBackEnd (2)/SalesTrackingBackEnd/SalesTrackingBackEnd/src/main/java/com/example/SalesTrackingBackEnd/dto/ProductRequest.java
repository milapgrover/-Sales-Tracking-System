package com.example.SalesTrackingBackEnd.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequest {

    @NotBlank
    private String productName;

    @NotNull
    @Positive
    private Integer stockQuantity;

    @NotNull
    @Positive
    private Integer minimumStock;

    @NotNull
    @Positive
    private Double unitPrice;
}
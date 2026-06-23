package com.example.SalesTrackingBackEnd.exception;

public class InsufficientStockException
        extends RuntimeException {

    public InsufficientStockException(
            String message) {

        super(message);
    }
}
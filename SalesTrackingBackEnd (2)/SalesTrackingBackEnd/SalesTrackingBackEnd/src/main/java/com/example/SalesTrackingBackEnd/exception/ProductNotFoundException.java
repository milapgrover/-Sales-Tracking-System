package com.example.SalesTrackingBackEnd.exception;

public class ProductNotFoundException
        extends RuntimeException {

    public ProductNotFoundException(
            String message) {

        super(message);
    }
}
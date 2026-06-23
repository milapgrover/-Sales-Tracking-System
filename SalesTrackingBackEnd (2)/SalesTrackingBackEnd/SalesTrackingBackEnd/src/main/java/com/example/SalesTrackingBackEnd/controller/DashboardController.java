package com.example.SalesTrackingBackEnd.controller;

import com.example.SalesTrackingBackEnd.dto.DashboardResponse;
import com.example.SalesTrackingBackEnd.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DashboardController {

    private final DashboardService
            dashboardService;

    @GetMapping
    public DashboardResponse
    getDashboardSummary() {

        return dashboardService
                .getDashboardSummary();
    }
}
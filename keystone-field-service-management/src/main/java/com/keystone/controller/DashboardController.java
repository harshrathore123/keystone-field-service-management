package com.keystone.controller;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keystone.response.ApiResponse;
import com.keystone.dto.DashboardDTO;
import com.keystone.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @PreAuthorize("hasAnyRole('MANAGER')")
    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<DashboardDTO>> getDashboardSummary() {

        DashboardDTO dashboard = dashboardService.getDashboardSummary();

        ApiResponse<DashboardDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Dashboard summary fetched successfully.",
                dashboard);

        return ResponseEntity.ok(response);
    }
}
package com.keystone.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keystone.dto.TechnicianPerformanceDTO;
import com.keystone.response.ApiResponse;
import com.keystone.service.TechnicianPerformanceService;

@RestController
@RequestMapping("/api/technicians")
public class TechnicianPerformanceController {

    private final TechnicianPerformanceService technicianPerformanceService;

    public TechnicianPerformanceController(
            TechnicianPerformanceService technicianPerformanceService) {
        this.technicianPerformanceService = technicianPerformanceService;
    }

    @GetMapping("/performance")
    public ResponseEntity<ApiResponse<List<TechnicianPerformanceDTO>>> getTechnicianPerformance() {

        List<TechnicianPerformanceDTO> performance =
                technicianPerformanceService.getTechnicianPerformance();

        ApiResponse<List<TechnicianPerformanceDTO>> response =
                new ApiResponse<>(
                        LocalDateTime.now(),
                        HttpStatus.OK.value(),
                        true,
                        "Technician performance fetched successfully.",
                        performance);

        return ResponseEntity.ok(response);
    }
}
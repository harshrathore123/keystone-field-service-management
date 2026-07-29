package com.keystone.controller;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keystone.dto.ChartDataDTO;
import com.keystone.response.ApiResponse;
import com.keystone.service.ChartService;

@RestController
@RequestMapping("/api/charts")
public class ChartController {

    private final ChartService chartService;

    public ChartController(ChartService chartService) {
        this.chartService = chartService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<ChartDataDTO>> getChartData() {

        ChartDataDTO chartData = chartService.getChartData();

        ApiResponse<ChartDataDTO> response =
                new ApiResponse<>(
                        LocalDateTime.now(),
                        HttpStatus.OK.value(),
                        true,
                        "Chart data fetched successfully.",
                        chartData);

        return ResponseEntity.ok(response);
    }
}
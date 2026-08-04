package com.keystone.controller;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keystone.response.ApiResponse;
import com.keystone.dto.ReportDTO;
import com.keystone.service.ReportService;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<ReportDTO>> getReportSummary() {

        ReportDTO report = reportService.getReportSummary();

        ApiResponse<ReportDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Report summary fetched successfully.",
                report
        );

        return ResponseEntity.ok(response);
    }
}
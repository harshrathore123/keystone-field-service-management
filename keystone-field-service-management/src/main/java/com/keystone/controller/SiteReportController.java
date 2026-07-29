package com.keystone.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keystone.dto.SiteReportDTO;
import com.keystone.response.ApiResponse;
import com.keystone.service.SiteReportService;

@RestController
@RequestMapping("/api/sites")
public class SiteReportController {

    private final SiteReportService siteReportService;

    public SiteReportController(SiteReportService siteReportService) {
        this.siteReportService = siteReportService;
    }

    @GetMapping("/reports")
    public ResponseEntity<ApiResponse<List<SiteReportDTO>>> getSiteReports() {

        List<SiteReportDTO> reports = siteReportService.getSiteReports();

        ApiResponse<List<SiteReportDTO>> response =
                new ApiResponse<>(
                        LocalDateTime.now(),
                        HttpStatus.OK.value(),
                        true,
                        "Site reports fetched successfully.",
                        reports);

        return ResponseEntity.ok(response);
    }
}
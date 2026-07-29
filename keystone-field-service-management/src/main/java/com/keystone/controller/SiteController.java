package com.keystone.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.SiteDTO;
import com.keystone.response.ApiResponse;
import com.keystone.service.SiteService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/sites")
public class SiteController {

    private final SiteService siteService;

    public SiteController(SiteService siteService) {
        this.siteService = siteService;
    }

    // Create Site
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','DISPATCHER')")
    @PostMapping
    public ResponseEntity<ApiResponse<SiteDTO>> createSite(
            @Valid @RequestBody SiteDTO siteDTO) {

        SiteDTO site = siteService.createSite(siteDTO);

        ApiResponse<SiteDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.CREATED.value(),
                true,
                "Site created successfully.",
                site);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Get All Sites
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','DISPATCHER')")
    @GetMapping
    public ResponseEntity<ApiResponse<List<SiteDTO>>> getAllSites() {

        List<SiteDTO> sites = siteService.getAllSites();

        ApiResponse<List<SiteDTO>> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Sites fetched successfully.",
                sites);

        return ResponseEntity.ok(response);
    }

    // Get Site By Id
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','DISPATCHER')")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SiteDTO>> getSiteById(
            @PathVariable Long id) {

        SiteDTO site = siteService.getSiteById(id);

        ApiResponse<SiteDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Site fetched successfully.",
                site);

        return ResponseEntity.ok(response);
    }

    // Update Site
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','DISPATCHER')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<SiteDTO>> updateSite(
            @PathVariable Long id,
            @Valid @RequestBody SiteDTO siteDTO) {

        SiteDTO updatedSite = siteService.updateSite(id, siteDTO);

        ApiResponse<SiteDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Site updated successfully.",
                updatedSite);

        return ResponseEntity.ok(response);
    }

    // Delete Site
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','DISPATCHER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSite(
            @PathVariable Long id) {

        siteService.deleteSite(id);

        ApiResponse<Void> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Site deleted successfully.",
                null);

        return ResponseEntity.ok(response);
    }
}
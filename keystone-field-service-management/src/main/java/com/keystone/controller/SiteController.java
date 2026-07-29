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

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/sites")
public class SiteController {

    private final SiteService siteService;

    public SiteController(SiteService siteService) {
        this.siteService = siteService;
    }

    // Create Site
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
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
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
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
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
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
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
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
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
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
    
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<SiteDTO>>> searchSites(
            @RequestParam String keyword) {

        List<SiteDTO> sites = siteService.searchSites(keyword);

        ApiResponse<List<SiteDTO>> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Sites fetched successfully.",
                sites);

        return ResponseEntity.ok(response);
    }
    
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @GetMapping("/page")
    public ResponseEntity<ApiResponse<Page<SiteDTO>>> getSitesWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<SiteDTO> sites = siteService.getSitesWithPagination(pageable);

        ApiResponse<Page<SiteDTO>> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Sites fetched successfully.",
                sites);

        return ResponseEntity.ok(response);
    }
}
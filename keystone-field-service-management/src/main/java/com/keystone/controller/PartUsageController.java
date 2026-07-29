package com.keystone.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.PartUsageDTO;
import com.keystone.response.ApiResponse;
import com.keystone.service.PartUsageService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/partusage")
public class PartUsageController {

    private final PartUsageService service;

    public PartUsageController(PartUsageService service) {
        this.service = service;
    }

    // Create Part Usage
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @PostMapping
    public ResponseEntity<ApiResponse<PartUsageDTO>> create(
            @Valid @RequestBody PartUsageDTO partUsageDTO) {

        PartUsageDTO savedPartUsage = service.createPartUsage(partUsageDTO);

        ApiResponse<PartUsageDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.CREATED.value(),
                true,
                "Part Usage created successfully.",
                savedPartUsage);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Get All Part Usages
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @GetMapping
    public ResponseEntity<ApiResponse<List<PartUsageDTO>>> getAll() {

        List<PartUsageDTO> partUsages = service.getAllPartUsages();

        ApiResponse<List<PartUsageDTO>> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Part Usages fetched successfully.",
                partUsages);

        return ResponseEntity.ok(response);
    }

    // Get Part Usage By Id
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PartUsageDTO>> getById(
            @PathVariable Long id) {

        PartUsageDTO partUsage = service.getPartUsageById(id);

        ApiResponse<PartUsageDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Part Usage fetched successfully.",
                partUsage);

        return ResponseEntity.ok(response);
    }

    // Update Part Usage
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PartUsageDTO>> update(
            @PathVariable Long id,
            @Valid @RequestBody PartUsageDTO partUsageDTO) {

        PartUsageDTO updatedPartUsage = service.updatePartUsage(id, partUsageDTO);

        ApiResponse<PartUsageDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Part Usage updated successfully.",
                updatedPartUsage);

        return ResponseEntity.ok(response);
    }

    // Delete Part Usage
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id) {

        service.deletePartUsage(id);

        ApiResponse<Void> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Part Usage deleted successfully.",
                null);

        return ResponseEntity.ok(response);
    }
}
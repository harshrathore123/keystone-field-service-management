package com.keystone.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.PartDTO;
import com.keystone.response.ApiResponse;
import com.keystone.service.PartService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/parts")
public class PartController {

    private final PartService partService;

    public PartController(PartService partService) {
        this.partService = partService;
    }

    // Create Part
    @PostMapping
    public ResponseEntity<ApiResponse<PartDTO>> createPart(
            @Valid @RequestBody PartDTO partDTO) {

        PartDTO part = partService.createPart(partDTO);

        ApiResponse<PartDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.CREATED.value(),
                true,
                "Part created successfully.",
                part);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Get All Parts
    @GetMapping
    public ResponseEntity<ApiResponse<List<PartDTO>>> getAllParts() {

        List<PartDTO> parts = partService.getAllParts();

        ApiResponse<List<PartDTO>> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Parts fetched successfully.",
                parts);

        return ResponseEntity.ok(response);
    }

    // Get Part By Id
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PartDTO>> getPartById(
            @PathVariable Long id) {

        PartDTO part = partService.getPartById(id);

        ApiResponse<PartDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Part fetched successfully.",
                part);

        return ResponseEntity.ok(response);
    }

    // Update Part
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PartDTO>> updatePart(
            @PathVariable Long id,
            @Valid @RequestBody PartDTO partDTO) {

        PartDTO part = partService.updatePart(id, partDTO);

        ApiResponse<PartDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Part updated successfully.",
                part);

        return ResponseEntity.ok(response);
    }

    // Delete Part
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePart(
            @PathVariable Long id) {

        partService.deletePart(id);

        ApiResponse<Void> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Part deleted successfully.",
                null);

        return ResponseEntity.ok(response);
    }
}
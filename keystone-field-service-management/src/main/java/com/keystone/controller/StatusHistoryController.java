package com.keystone.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.StatusHistoryDTO;
import com.keystone.response.ApiResponse;
import com.keystone.service.StatusHistoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/statushistory")
public class StatusHistoryController {

    private final StatusHistoryService service;

    public StatusHistoryController(StatusHistoryService service) {
        this.service = service;
    }

    // Create Status History
    @PostMapping
    public ResponseEntity<ApiResponse<StatusHistoryDTO>> create(
            @Valid @RequestBody StatusHistoryDTO statusHistoryDTO) {

        StatusHistoryDTO savedStatusHistory = service.createStatusHistory(statusHistoryDTO);

        ApiResponse<StatusHistoryDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.CREATED.value(),
                true,
                "Status History created successfully.",
                savedStatusHistory);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Get All Status Histories
    @GetMapping
    public ResponseEntity<ApiResponse<List<StatusHistoryDTO>>> getAll() {

        List<StatusHistoryDTO> statusHistories = service.getAllStatusHistories();

        ApiResponse<List<StatusHistoryDTO>> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Status Histories fetched successfully.",
                statusHistories);

        return ResponseEntity.ok(response);
    }

    // Get Status History By Id
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StatusHistoryDTO>> getById(
            @PathVariable Long id) {

        StatusHistoryDTO statusHistory = service.getStatusHistoryById(id);

        ApiResponse<StatusHistoryDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Status History fetched successfully.",
                statusHistory);

        return ResponseEntity.ok(response);
    }

    // Update Status History
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<StatusHistoryDTO>> update(
            @PathVariable Long id,
            @Valid @RequestBody StatusHistoryDTO statusHistoryDTO) {

        StatusHistoryDTO updatedStatusHistory = service.updateStatusHistory(id, statusHistoryDTO);

        ApiResponse<StatusHistoryDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Status History updated successfully.",
                updatedStatusHistory);

        return ResponseEntity.ok(response);
    }

    // Delete Status History
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id) {

        service.deleteStatusHistory(id);

        ApiResponse<Void> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Status History deleted successfully.",
                null);

        return ResponseEntity.ok(response);
    }
}
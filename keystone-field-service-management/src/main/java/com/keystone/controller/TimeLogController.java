package com.keystone.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.TimeLogDTO;
import com.keystone.response.ApiResponse;
import com.keystone.service.TimeLogService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/timelogs")
public class TimeLogController {

    private final TimeLogService service;

    public TimeLogController(TimeLogService service) {
        this.service = service;
    }

    // Create Time Log
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER','TECHNICIAN')")
    @PostMapping
    public ResponseEntity<ApiResponse<TimeLogDTO>> create(
            @Valid @RequestBody TimeLogDTO timeLogDTO) {

        TimeLogDTO savedTimeLog = service.createTimeLog(timeLogDTO);

        ApiResponse<TimeLogDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.CREATED.value(),
                true,
                "Time Log created successfully.",
                savedTimeLog);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Get All Time Logs
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER','TECHNICIAN')")
    @GetMapping
    public ResponseEntity<ApiResponse<List<TimeLogDTO>>> getAll() {

        List<TimeLogDTO> timeLogs = service.getAllTimeLogs();

        ApiResponse<List<TimeLogDTO>> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Time Logs fetched successfully.",
                timeLogs);

        return ResponseEntity.ok(response);
    }

    // Get Time Log By Id
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER','TECHNICIAN')")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TimeLogDTO>> getById(
            @PathVariable Long id) {

        TimeLogDTO timeLog = service.getTimeLogById(id);

        ApiResponse<TimeLogDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Time Log fetched successfully.",
                timeLog);

        return ResponseEntity.ok(response);
    }

    // Update Time Log
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER','TECHNICIAN')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TimeLogDTO>> update(
            @PathVariable Long id,
            @Valid @RequestBody TimeLogDTO timeLogDTO) {

        TimeLogDTO updatedTimeLog = service.updateTimeLog(id, timeLogDTO);

        ApiResponse<TimeLogDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Time Log updated successfully.",
                updatedTimeLog);

        return ResponseEntity.ok(response);
    }

    // Delete Time Log
    @PreAuthorize("hasAnyRole('MANAGER','DISPATCHER','TECHNICIAN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id) {

        service.deleteTimeLog(id);

        ApiResponse<Void> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Time Log deleted successfully.",
                null);

        return ResponseEntity.ok(response);
    }
}
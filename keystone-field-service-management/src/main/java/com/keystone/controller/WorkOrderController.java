package com.keystone.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.WorkOrderDTO;
import com.keystone.response.ApiResponse;
import com.keystone.service.WorkOrderService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/workorders")
public class WorkOrderController {

    private final WorkOrderService workOrderService;

    public WorkOrderController(WorkOrderService workOrderService) {
        this.workOrderService = workOrderService;
    }

    // Create WorkOrder
    @PostMapping
    public ResponseEntity<ApiResponse<WorkOrderDTO>> createWorkOrder(
            @Valid @RequestBody WorkOrderDTO workOrderDTO) {

        WorkOrderDTO workOrder = workOrderService.createWorkOrder(workOrderDTO);

        ApiResponse<WorkOrderDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.CREATED.value(),
                true,
                "Work Order created successfully.",
                workOrder);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Get All WorkOrders
    @GetMapping
    public ResponseEntity<ApiResponse<List<WorkOrderDTO>>> getAllWorkOrders() {

        List<WorkOrderDTO> workOrders = workOrderService.getAllWorkOrders();

        ApiResponse<List<WorkOrderDTO>> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Work Orders fetched successfully.",
                workOrders);

        return ResponseEntity.ok(response);
    }

    // Get WorkOrder By Id
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<WorkOrderDTO>> getWorkOrderById(
            @PathVariable Long id) {

        WorkOrderDTO workOrder = workOrderService.getWorkOrderById(id);

        ApiResponse<WorkOrderDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Work Order fetched successfully.",
                workOrder);

        return ResponseEntity.ok(response);
    }

    // Update WorkOrder
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<WorkOrderDTO>> updateWorkOrder(
            @PathVariable Long id,
            @Valid @RequestBody WorkOrderDTO workOrderDTO) {

        WorkOrderDTO updatedWorkOrder = workOrderService.updateWorkOrder(id, workOrderDTO);

        ApiResponse<WorkOrderDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Work Order updated successfully.",
                updatedWorkOrder);

        return ResponseEntity.ok(response);
    }

    // Delete WorkOrder
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteWorkOrder(
            @PathVariable Long id) {

        workOrderService.deleteWorkOrder(id);

        ApiResponse<Void> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Work Order deleted successfully.",
                null);

        return ResponseEntity.ok(response);
    }
    
 // Search Work Orders
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<WorkOrderDTO>>> searchWorkOrders(
            @RequestParam String keyword) {

        List<WorkOrderDTO> workOrders = workOrderService.searchWorkOrders(keyword);

        ApiResponse<List<WorkOrderDTO>> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Work Orders fetched successfully.",
                workOrders);

        return ResponseEntity.ok(response);
    }
    
 // Pagination
    @GetMapping("/page")
    public ResponseEntity<ApiResponse<Page<WorkOrderDTO>>> getWorkOrdersWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<WorkOrderDTO> workOrders =
                workOrderService.getWorkOrdersWithPagination(pageable);

        ApiResponse<Page<WorkOrderDTO>> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Work Orders fetched successfully.",
                workOrders);

        return ResponseEntity.ok(response);
    }
    
 // Assign Technician
    @PutMapping("/{workOrderId}/assign-technician/{userId}")
    public ResponseEntity<ApiResponse<WorkOrderDTO>> assignTechnician(
            @PathVariable Long workOrderId,
            @PathVariable Long userId) {

        WorkOrderDTO workOrder =
                workOrderService.assignTechnician(workOrderId, userId);

        ApiResponse<WorkOrderDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Technician assigned successfully.",
                workOrder);

        return ResponseEntity.ok(response);
    }
    
 // Update Priority
    @PutMapping("/{workOrderId}/priority/{priority}")
    public ResponseEntity<ApiResponse<WorkOrderDTO>> updatePriority(
            @PathVariable Long workOrderId,
            @PathVariable String priority) {

        WorkOrderDTO workOrder =
                workOrderService.updatePriority(workOrderId, priority);

        ApiResponse<WorkOrderDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Priority updated successfully.",
                workOrder);

        return ResponseEntity.ok(response);
    }
    
 // Update Status
    @PutMapping("/{workOrderId}/status/{status}")
    public ResponseEntity<ApiResponse<WorkOrderDTO>> updateStatus(
            @PathVariable Long workOrderId,
            @PathVariable String status) {

        WorkOrderDTO workOrder =
                workOrderService.updateStatus(workOrderId, status);

        ApiResponse<WorkOrderDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Status updated successfully.",
                workOrder);

        return ResponseEntity.ok(response);
    }
    
 // Update SLA Date
    @PutMapping("/{workOrderId}/sla-date/{slaDate}")
    public ResponseEntity<ApiResponse<WorkOrderDTO>> updateSlaDate(
            @PathVariable Long workOrderId,
            @PathVariable String slaDate) {

        WorkOrderDTO workOrder =
                workOrderService.updateSlaDate(workOrderId, slaDate);

        ApiResponse<WorkOrderDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "SLA Date updated successfully.",
                workOrder);

        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/my-jobs")
    @PreAuthorize("hasRole('TECHNICIAN')")
    public ResponseEntity<ApiResponse<List<WorkOrderDTO>>> getMyAssignedJobs() {

        List<WorkOrderDTO> workOrders = workOrderService.getMyAssignedJobs();

        ApiResponse<List<WorkOrderDTO>> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Assigned work orders fetched successfully.",
                workOrders
        );

        return ResponseEntity.ok(response);
    }
    
 // Start Job
    @PutMapping("/{workOrderId}/start")
    @PreAuthorize("hasRole('TECHNICIAN')")
    public ResponseEntity<ApiResponse<WorkOrderDTO>> startJob(
            @PathVariable Long workOrderId) {

        WorkOrderDTO workOrder = workOrderService.startJob(workOrderId);

        ApiResponse<WorkOrderDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Job started successfully.",
                workOrder);

        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/{workOrderId}/pause")
    @PreAuthorize("hasRole('TECHNICIAN')")
    public ResponseEntity<ApiResponse<WorkOrderDTO>> pauseJob(
            @PathVariable Long workOrderId) {

        WorkOrderDTO workOrder = workOrderService.pauseJob(workOrderId);

        ApiResponse<WorkOrderDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Job paused successfully.",
                workOrder);

        return ResponseEntity.ok(response);
    }
    
 // Resume Job
    @PutMapping("/{workOrderId}/resume")
    @PreAuthorize("hasRole('TECHNICIAN')")
    public ResponseEntity<ApiResponse<WorkOrderDTO>> resumeJob(
            @PathVariable Long workOrderId) {

        WorkOrderDTO workOrder = workOrderService.resumeJob(workOrderId);

        ApiResponse<WorkOrderDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Job resumed successfully.",
                workOrder);

        return ResponseEntity.ok(response);
    }
    
 // Complete Job
    @PutMapping("/{workOrderId}/complete")
    @PreAuthorize("hasRole('TECHNICIAN')")
    public ResponseEntity<ApiResponse<WorkOrderDTO>> completeJob(
            @PathVariable Long workOrderId) {

        WorkOrderDTO workOrder = workOrderService.completeJob(workOrderId);

        ApiResponse<WorkOrderDTO> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                true,
                "Job completed successfully.",
                workOrder);

        return ResponseEntity.ok(response);
    }
}
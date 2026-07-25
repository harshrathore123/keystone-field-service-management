package com.keystone.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.WorkOrderDTO;
import com.keystone.response.ApiResponse;
import com.keystone.service.WorkOrderService;

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
}
package com.keystone.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.CustomerDashboardDTO;
import com.keystone.dto.CustomerRequestDTO;
import com.keystone.dto.WorkOrderDTO;
import com.keystone.service.CustomerPortalService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerPortalController {

    private final CustomerPortalService customerPortalService;

    @PreAuthorize("hasRole('CUSTOMER')")
    @PostMapping("/request")
    public ResponseEntity<WorkOrderDTO> raiseServiceRequest(
            @Valid @RequestBody CustomerRequestDTO requestDTO) {

        WorkOrderDTO response =
                customerPortalService.raiseServiceRequest(requestDTO);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/requests")
    public ResponseEntity<List<WorkOrderDTO>> getMyRequests() {

        List<WorkOrderDTO> workOrders = customerPortalService.getMyRequests();

        return ResponseEntity.ok(workOrders);
    }
    
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/requests/{workOrderId}")
    public ResponseEntity<WorkOrderDTO> getRequestById(
            @PathVariable Long workOrderId) {

        WorkOrderDTO workOrder =
                customerPortalService.getRequestById(workOrderId);

        return ResponseEntity.ok(workOrder);
    }
    
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/dashboard")
    public ResponseEntity<CustomerDashboardDTO> getDashboard() {

        CustomerDashboardDTO dashboard =
                customerPortalService.getDashboard();

        return ResponseEntity.ok(dashboard);
    }
}
package com.keystone.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.keystone.entity.WorkOrder;
import com.keystone.service.WorkOrderService;

@RestController
@RequestMapping("/api/workorders")
public class WorkOrderController {

    private final WorkOrderService workOrderService;

    public WorkOrderController(WorkOrderService workOrderService) {
        this.workOrderService = workOrderService;
    }

    // Create WorkOrder
    @PostMapping
    public WorkOrder createWorkOrder(@RequestBody WorkOrder workOrder) {
        return workOrderService.createWorkOrder(workOrder);
    }

    // Get All WorkOrders
    @GetMapping
    public List<WorkOrder> getAllWorkOrders() {
        return workOrderService.getAllWorkOrders();
    }

    // Get WorkOrder By Id
    @GetMapping("/{id}")
    public WorkOrder getWorkOrderById(@PathVariable Long id) {
        return workOrderService.getWorkOrderById(id);
    }

    // Update WorkOrder
    @PutMapping("/{id}")
    public WorkOrder updateWorkOrder(@PathVariable Long id,
                                     @RequestBody WorkOrder workOrder) {
        return workOrderService.updateWorkOrder(id, workOrder);
    }

    // Delete WorkOrder
    @DeleteMapping("/{id}")
    public String deleteWorkOrder(@PathVariable Long id) {
        workOrderService.deleteWorkOrder(id);
        return "Work Order Deleted Successfully";
    }
}
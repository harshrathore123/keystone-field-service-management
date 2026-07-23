package com.keystone.service;

import java.util.List;

import com.keystone.entity.WorkOrder;

public interface WorkOrderService {

    // Create WorkOrder
    WorkOrder createWorkOrder(WorkOrder workOrder);

    // Get All WorkOrders
    List<WorkOrder> getAllWorkOrders();

    // Get WorkOrder By Id
    WorkOrder getWorkOrderById(Long id);

    // Update WorkOrder
    WorkOrder updateWorkOrder(Long id, WorkOrder workOrder);

    // Delete WorkOrder
    void deleteWorkOrder(Long id);

}
package com.keystone.service;

import java.util.List;

import com.keystone.dto.WorkOrderDTO;

public interface WorkOrderService {

    // Create WorkOrder
    WorkOrderDTO createWorkOrder(WorkOrderDTO workOrderDTO);

    // Get All WorkOrders
    List<WorkOrderDTO> getAllWorkOrders();

    // Get WorkOrder By Id
    WorkOrderDTO getWorkOrderById(Long id);

    // Update WorkOrder
    WorkOrderDTO updateWorkOrder(Long id, WorkOrderDTO workOrderDTO);

    // Delete WorkOrder
    void deleteWorkOrder(Long id);

}
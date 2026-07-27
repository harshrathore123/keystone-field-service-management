package com.keystone.service;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    
 // Search Work Orders
    List<WorkOrderDTO> searchWorkOrders(String keyword);

    // Pagination
    Page<WorkOrderDTO> getWorkOrdersWithPagination(Pageable pageable);

 // Assign Technician
    WorkOrderDTO assignTechnician(Long workOrderId, Long userId);
    
 // Update Priority
    WorkOrderDTO updatePriority(Long workOrderId, String priority);

 // Update Status
    WorkOrderDTO updateStatus(Long workOrderId, String status);
    
 // Update SLA Date
    WorkOrderDTO updateSlaDate(Long workOrderId, String slaDate);
    
}
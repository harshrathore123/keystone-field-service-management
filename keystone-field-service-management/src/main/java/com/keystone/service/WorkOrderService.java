package com.keystone.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.keystone.dto.WorkOrderDTO;

public interface WorkOrderService {

    // CRUD
    WorkOrderDTO createWorkOrder(WorkOrderDTO workOrderDTO);

    List<WorkOrderDTO> getAllWorkOrders();

    WorkOrderDTO getWorkOrderById(Long id);

    WorkOrderDTO updateWorkOrder(Long id, WorkOrderDTO workOrderDTO);

    void deleteWorkOrder(Long id);

    // Search
    List<WorkOrderDTO> searchWorkOrders(String keyword);

    // Pagination
    Page<WorkOrderDTO> getWorkOrdersWithPagination(Pageable pageable);

    // Technician Assignment
    WorkOrderDTO assignTechnician(Long workOrderId, Long userId);

    // Work Order Management
    WorkOrderDTO updatePriority(Long workOrderId, String priority);

    WorkOrderDTO updateStatus(Long workOrderId, String status);

    WorkOrderDTO updateSlaDate(Long workOrderId, String slaDate);

    // Technician APIs
    List<WorkOrderDTO> getMyAssignedJobs();

    WorkOrderDTO startJob(Long workOrderId);

    WorkOrderDTO pauseJob(Long workOrderId);

    WorkOrderDTO resumeJob(Long workOrderId);

    WorkOrderDTO completeJob(Long workOrderId);
}
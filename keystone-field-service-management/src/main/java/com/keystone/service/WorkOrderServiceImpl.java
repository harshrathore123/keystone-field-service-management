package com.keystone.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.keystone.entity.WorkOrder;
import com.keystone.repository.WorkOrderRepository;

@Service
public class WorkOrderServiceImpl implements WorkOrderService {

    private final WorkOrderRepository workOrderRepository;

    public WorkOrderServiceImpl(WorkOrderRepository workOrderRepository) {
        this.workOrderRepository = workOrderRepository;
    }

    @Override
    public WorkOrder createWorkOrder(WorkOrder workOrder) {
        return workOrderRepository.save(workOrder);
    }

    @Override
    public List<WorkOrder> getAllWorkOrders() {
        return workOrderRepository.findAll();
    }

    @Override
    public WorkOrder getWorkOrderById(Long id) {
        return workOrderRepository.findById(id).orElse(null);
    }

    @Override
    public WorkOrder updateWorkOrder(Long id, WorkOrder workOrder) {

        WorkOrder existingWorkOrder = workOrderRepository.findById(id).orElse(null);

        if (existingWorkOrder != null) {
            existingWorkOrder.setWorkOrderNumber(workOrder.getWorkOrderNumber());
            existingWorkOrder.setTitle(workOrder.getTitle());
            existingWorkOrder.setDescription(workOrder.getDescription());
            existingWorkOrder.setPriority(workOrder.getPriority());
            existingWorkOrder.setStatus(workOrder.getStatus());
            existingWorkOrder.setScheduledDate(workOrder.getScheduledDate());
            existingWorkOrder.setActive(workOrder.getActive());

            return workOrderRepository.save(existingWorkOrder);
        }

        return null;
    }

    @Override
    public void deleteWorkOrder(Long id) {
        workOrderRepository.deleteById(id);
    }
}
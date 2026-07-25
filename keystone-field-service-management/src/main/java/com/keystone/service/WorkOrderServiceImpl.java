package com.keystone.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.keystone.dto.WorkOrderDTO;
import com.keystone.entity.Customer;
import com.keystone.entity.Site;
import com.keystone.entity.User;
import com.keystone.entity.WorkOrder;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.mapper.WorkOrderMapper;
import com.keystone.repository.WorkOrderRepository;

@Service
public class WorkOrderServiceImpl implements WorkOrderService {

    private final WorkOrderRepository workOrderRepository;

    public WorkOrderServiceImpl(WorkOrderRepository workOrderRepository) {
        this.workOrderRepository = workOrderRepository;
    }

    @Override
    public WorkOrderDTO createWorkOrder(WorkOrderDTO workOrderDTO) {

        WorkOrder workOrder = WorkOrderMapper.toEntity(workOrderDTO);

        WorkOrder savedWorkOrder = workOrderRepository.save(workOrder);

        return WorkOrderMapper.toDTO(savedWorkOrder);
    }

    @Override
    public List<WorkOrderDTO> getAllWorkOrders() {

        return workOrderRepository.findAll()
                .stream()
                .map(WorkOrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public WorkOrderDTO getWorkOrderById(Long id) {

        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Work Order not found with id : " + id));

        return WorkOrderMapper.toDTO(workOrder);
    }

    @Override
    public WorkOrderDTO updateWorkOrder(Long id, WorkOrderDTO workOrderDTO) {

        WorkOrder existingWorkOrder = workOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Work Order not found with id : " + id));

        existingWorkOrder.setWorkOrderNumber(workOrderDTO.getWorkOrderNumber());
        existingWorkOrder.setTitle(workOrderDTO.getTitle());
        existingWorkOrder.setDescription(workOrderDTO.getDescription());
        existingWorkOrder.setPriority(workOrderDTO.getPriority());
        existingWorkOrder.setStatus(workOrderDTO.getStatus());
        existingWorkOrder.setScheduledDate(workOrderDTO.getScheduledDate());
        existingWorkOrder.setActive(workOrderDTO.getActive());

        // Update Customer Relationship
        if (workOrderDTO.getCustomerId() != null) {
            Customer customer = new Customer();
            customer.setId(workOrderDTO.getCustomerId());
            existingWorkOrder.setCustomer(customer);
        }

        // Update Site Relationship
        if (workOrderDTO.getSiteId() != null) {
            Site site = new Site();
            site.setId(workOrderDTO.getSiteId());
            existingWorkOrder.setSite(site);
        }

        // Update Assigned User Relationship
        if (workOrderDTO.getAssignedUserId() != null) {
            User user = new User();
            user.setId(workOrderDTO.getAssignedUserId());
            existingWorkOrder.setAssignedUser(user);
        }

        WorkOrder updatedWorkOrder = workOrderRepository.save(existingWorkOrder);

        return WorkOrderMapper.toDTO(updatedWorkOrder);
    }

    @Override
    public void deleteWorkOrder(Long id) {

        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Work Order not found with id : " + id));

        workOrderRepository.delete(workOrder);
    }
}
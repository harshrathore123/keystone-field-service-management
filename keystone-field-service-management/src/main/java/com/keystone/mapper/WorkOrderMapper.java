package com.keystone.mapper;

import com.keystone.dto.WorkOrderDTO;
import com.keystone.entity.Customer;
import com.keystone.entity.Site;
import com.keystone.entity.User;
import com.keystone.entity.WorkOrder;

public final class WorkOrderMapper {

    private WorkOrderMapper() {
    }

    // Entity -> DTO
    public static WorkOrderDTO toDTO(WorkOrder workOrder) {

        if (workOrder == null) {
            return null;
        }

        WorkOrderDTO dto = new WorkOrderDTO();

        dto.setId(workOrder.getId());
        dto.setWorkOrderNumber(workOrder.getWorkOrderNumber());
        dto.setTitle(workOrder.getTitle());
        dto.setDescription(workOrder.getDescription());
        dto.setPriority(workOrder.getPriority());
        dto.setStatus(workOrder.getStatus());
        dto.setScheduledDate(workOrder.getScheduledDate());
        dto.setSlaDate(workOrder.getSlaDate());
        dto.setActive(workOrder.getActive());

        if (workOrder.getCustomer() != null) {
            dto.setCustomerId(workOrder.getCustomer().getId());
        }

        if (workOrder.getSite() != null) {
            dto.setSiteId(workOrder.getSite().getId());
        }

        if (workOrder.getAssignedUser() != null) {
            dto.setAssignedUserId(workOrder.getAssignedUser().getId());
        }

        return dto;
    }

    // DTO -> Entity
    public static WorkOrder toEntity(WorkOrderDTO dto) {

        if (dto == null) {
            return null;
        }

        WorkOrder workOrder = new WorkOrder();

        workOrder.setId(dto.getId());
        workOrder.setWorkOrderNumber(dto.getWorkOrderNumber());
        workOrder.setTitle(dto.getTitle());
        workOrder.setDescription(dto.getDescription());
        workOrder.setPriority(dto.getPriority());
        workOrder.setStatus(dto.getStatus());
        workOrder.setScheduledDate(dto.getScheduledDate());
        workOrder.setSlaDate(dto.getSlaDate());
        workOrder.setActive(dto.getActive());

        if (dto.getCustomerId() != null) {
            Customer customer = new Customer();
            customer.setId(dto.getCustomerId());
            workOrder.setCustomer(customer);
        }

        if (dto.getSiteId() != null) {
            Site site = new Site();
            site.setId(dto.getSiteId());
            workOrder.setSite(site);
        }

        if (dto.getAssignedUserId() != null) {
            User user = new User();
            user.setId(dto.getAssignedUserId());
            workOrder.setAssignedUser(user);
        }

        return workOrder;
    }
}
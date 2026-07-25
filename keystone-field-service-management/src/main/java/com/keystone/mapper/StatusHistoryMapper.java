package com.keystone.mapper;

import com.keystone.dto.StatusHistoryDTO;
import com.keystone.entity.StatusHistory;
import com.keystone.entity.WorkOrder;

public class StatusHistoryMapper {

    // Entity -> DTO
    public static StatusHistoryDTO toDTO(StatusHistory statusHistory) {

        if (statusHistory == null) {
            return null;
        }

        StatusHistoryDTO dto = new StatusHistoryDTO();

        dto.setId(statusHistory.getId());
        dto.setOldStatus(statusHistory.getOldStatus());
        dto.setNewStatus(statusHistory.getNewStatus());
        dto.setChangedBy(statusHistory.getChangedBy());
        dto.setChangedDate(statusHistory.getChangedDate());
        dto.setRemarks(statusHistory.getRemarks());

        if (statusHistory.getWorkOrder() != null) {
            dto.setWorkOrderId(statusHistory.getWorkOrder().getId());
        }

        return dto;
    }

    // DTO -> Entity
    public static StatusHistory toEntity(StatusHistoryDTO dto) {

        if (dto == null) {
            return null;
        }

        StatusHistory statusHistory = new StatusHistory();

        statusHistory.setId(dto.getId());
        statusHistory.setOldStatus(dto.getOldStatus());
        statusHistory.setNewStatus(dto.getNewStatus());
        statusHistory.setChangedBy(dto.getChangedBy());
        statusHistory.setChangedDate(dto.getChangedDate());
        statusHistory.setRemarks(dto.getRemarks());

        if (dto.getWorkOrderId() != null) {
            WorkOrder workOrder = new WorkOrder();
            workOrder.setId(dto.getWorkOrderId());
            statusHistory.setWorkOrder(workOrder);
        }

        return statusHistory;
    }
}
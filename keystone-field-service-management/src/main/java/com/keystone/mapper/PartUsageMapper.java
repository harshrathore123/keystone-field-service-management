package com.keystone.mapper;

import com.keystone.dto.PartUsageDTO;
import com.keystone.entity.Part;
import com.keystone.entity.PartUsage;
import com.keystone.entity.WorkOrder;

public class PartUsageMapper {

    // Entity -> DTO
	public static PartUsageDTO toDTO(PartUsage partUsage) {

	    if (partUsage == null) {
	        return null;
	    }

	    PartUsageDTO dto = new PartUsageDTO();

	    dto.setId(partUsage.getId());
	    dto.setQuantityUsed(partUsage.getQuantityUsed());
	    dto.setUsedDate(partUsage.getUsedDate());
	    dto.setRemarks(partUsage.getRemarks());

	    if (partUsage.getWorkOrder() != null) {

	        dto.setWorkOrderId(partUsage.getWorkOrder().getId());

	        dto.setWorkOrderNumber(
	                partUsage.getWorkOrder().getWorkOrderNumber());

	        dto.setWorkOrderTitle(
	                partUsage.getWorkOrder().getTitle());
	    }

	    if (partUsage.getPart() != null) {

	        dto.setPartId(partUsage.getPart().getId());

	        dto.setPartName(
	                partUsage.getPart().getPartName());

	        dto.setPartNumber(
	                partUsage.getPart().getPartNumber());
	    }

	    return dto;
	}

    // DTO -> Entity
    public static PartUsage toEntity(PartUsageDTO dto) {

        if (dto == null) {
            return null;
        }

        PartUsage partUsage = new PartUsage();

        partUsage.setId(dto.getId());
        partUsage.setQuantityUsed(dto.getQuantityUsed());
        partUsage.setUsedDate(dto.getUsedDate());
        partUsage.setRemarks(dto.getRemarks());

        if (dto.getWorkOrderId() != null) {
            WorkOrder workOrder = new WorkOrder();
            workOrder.setId(dto.getWorkOrderId());
            partUsage.setWorkOrder(workOrder);
        }

        if (dto.getPartId() != null) {
            Part part = new Part();
            part.setId(dto.getPartId());
            partUsage.setPart(part);
        }

        return partUsage;
    }
}
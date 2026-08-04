package com.keystone.mapper;

import com.keystone.dto.TimeLogDTO;
import com.keystone.entity.TimeLog;
import com.keystone.entity.WorkOrder;

public class TimeLogMapper {

    // Entity -> DTO
	public static TimeLogDTO toDTO(TimeLog timeLog) {

	    if (timeLog == null) {
	        return null;
	    }

	    TimeLogDTO dto = new TimeLogDTO();

	    dto.setId(timeLog.getId());
	    dto.setStartTime(timeLog.getStartTime());
	    dto.setEndTime(timeLog.getEndTime());
	    dto.setHoursWorked(timeLog.getHoursWorked());
	    dto.setWorkDescription(timeLog.getWorkDescription());

	    if (timeLog.getWorkOrder() != null) {

	        dto.setWorkOrderId(timeLog.getWorkOrder().getId());

	        dto.setWorkOrderNumber(
	                timeLog.getWorkOrder().getWorkOrderNumber());

	        dto.setWorkOrderTitle(
	                timeLog.getWorkOrder().getTitle());
	    }

	    return dto;
	}

    // DTO -> Entity
    public static TimeLog toEntity(TimeLogDTO dto) {

        if (dto == null) {
            return null;
        }

        TimeLog timeLog = new TimeLog();

        timeLog.setId(dto.getId());
        timeLog.setStartTime(dto.getStartTime());
        timeLog.setEndTime(dto.getEndTime());
        timeLog.setHoursWorked(dto.getHoursWorked());
        timeLog.setWorkDescription(dto.getWorkDescription());

        if (dto.getWorkOrderId() != null) {
            WorkOrder workOrder = new WorkOrder();
            workOrder.setId(dto.getWorkOrderId());
            timeLog.setWorkOrder(workOrder);
        }

        return timeLog;
    }
}
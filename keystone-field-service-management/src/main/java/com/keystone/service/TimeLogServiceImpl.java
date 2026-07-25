package com.keystone.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.keystone.dto.TimeLogDTO;
import com.keystone.entity.TimeLog;
import com.keystone.entity.WorkOrder;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.mapper.TimeLogMapper;
import com.keystone.repository.TimeLogRepository;

@Service
public class TimeLogServiceImpl implements TimeLogService {

    private final TimeLogRepository repository;

    public TimeLogServiceImpl(TimeLogRepository repository) {
        this.repository = repository;
    }

    @Override
    public TimeLogDTO createTimeLog(TimeLogDTO timeLogDTO) {

        TimeLog timeLog = TimeLogMapper.toEntity(timeLogDTO);

        TimeLog savedTimeLog = repository.save(timeLog);

        return TimeLogMapper.toDTO(savedTimeLog);
    }

    @Override
    public List<TimeLogDTO> getAllTimeLogs() {

        return repository.findAll()
                .stream()
                .map(TimeLogMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TimeLogDTO getTimeLogById(Long id) {

        TimeLog timeLog = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Time Log not found with id : " + id));

        return TimeLogMapper.toDTO(timeLog);
    }

    @Override
    public TimeLogDTO updateTimeLog(Long id, TimeLogDTO timeLogDTO) {

        TimeLog existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Time Log not found with id : " + id));

        existing.setStartTime(timeLogDTO.getStartTime());
        existing.setEndTime(timeLogDTO.getEndTime());
        existing.setHoursWorked(timeLogDTO.getHoursWorked());
        existing.setWorkDescription(timeLogDTO.getWorkDescription());

        // Update WorkOrder Relationship
        if (timeLogDTO.getWorkOrderId() != null) {
            WorkOrder workOrder = new WorkOrder();
            workOrder.setId(timeLogDTO.getWorkOrderId());
            existing.setWorkOrder(workOrder);
        }

        TimeLog updatedTimeLog = repository.save(existing);

        return TimeLogMapper.toDTO(updatedTimeLog);
    }

    @Override
    public void deleteTimeLog(Long id) {

        TimeLog timeLog = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Time Log not found with id : " + id));

        repository.delete(timeLog);
    }
}
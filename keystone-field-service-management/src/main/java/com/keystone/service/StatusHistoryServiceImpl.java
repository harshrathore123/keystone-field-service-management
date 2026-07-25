package com.keystone.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.keystone.dto.StatusHistoryDTO;
import com.keystone.entity.StatusHistory;
import com.keystone.entity.WorkOrder;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.mapper.StatusHistoryMapper;
import com.keystone.repository.StatusHistoryRepository;

@Service
public class StatusHistoryServiceImpl implements StatusHistoryService {

    private final StatusHistoryRepository repository;

    public StatusHistoryServiceImpl(StatusHistoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public StatusHistoryDTO createStatusHistory(StatusHistoryDTO statusHistoryDTO) {

        StatusHistory statusHistory = StatusHistoryMapper.toEntity(statusHistoryDTO);

        StatusHistory savedStatusHistory = repository.save(statusHistory);

        return StatusHistoryMapper.toDTO(savedStatusHistory);
    }

    @Override
    public List<StatusHistoryDTO> getAllStatusHistories() {

        return repository.findAll()
                .stream()
                .map(StatusHistoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public StatusHistoryDTO getStatusHistoryById(Long id) {

        StatusHistory statusHistory = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Status History not found with id : " + id));

        return StatusHistoryMapper.toDTO(statusHistory);
    }

    @Override
    public StatusHistoryDTO updateStatusHistory(Long id, StatusHistoryDTO statusHistoryDTO) {

        StatusHistory existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Status History not found with id : " + id));

        existing.setOldStatus(statusHistoryDTO.getOldStatus());
        existing.setNewStatus(statusHistoryDTO.getNewStatus());
        existing.setChangedBy(statusHistoryDTO.getChangedBy());
        existing.setChangedDate(statusHistoryDTO.getChangedDate());
        existing.setRemarks(statusHistoryDTO.getRemarks());

        // Update WorkOrder Relationship
        if (statusHistoryDTO.getWorkOrderId() != null) {
            WorkOrder workOrder = new WorkOrder();
            workOrder.setId(statusHistoryDTO.getWorkOrderId());
            existing.setWorkOrder(workOrder);
        }

        StatusHistory updatedStatusHistory = repository.save(existing);

        return StatusHistoryMapper.toDTO(updatedStatusHistory);
    }

    @Override
    public void deleteStatusHistory(Long id) {

        StatusHistory statusHistory = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Status History not found with id : " + id));

        repository.delete(statusHistory);
    }
}
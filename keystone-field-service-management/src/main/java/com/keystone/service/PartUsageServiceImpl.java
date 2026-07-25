package com.keystone.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.keystone.dto.PartUsageDTO;
import com.keystone.entity.Part;
import com.keystone.entity.PartUsage;
import com.keystone.entity.WorkOrder;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.mapper.PartUsageMapper;
import com.keystone.repository.PartUsageRepository;

@Service
public class PartUsageServiceImpl implements PartUsageService {

    private final PartUsageRepository repository;

    public PartUsageServiceImpl(PartUsageRepository repository) {
        this.repository = repository;
    }

    @Override
    public PartUsageDTO createPartUsage(PartUsageDTO partUsageDTO) {

        PartUsage partUsage = PartUsageMapper.toEntity(partUsageDTO);

        PartUsage savedPartUsage = repository.save(partUsage);

        return PartUsageMapper.toDTO(savedPartUsage);
    }

    @Override
    public List<PartUsageDTO> getAllPartUsages() {

        return repository.findAll()
                .stream()
                .map(PartUsageMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PartUsageDTO getPartUsageById(Long id) {

        PartUsage partUsage = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Part Usage not found with id : " + id));

        return PartUsageMapper.toDTO(partUsage);
    }

    @Override
    public PartUsageDTO updatePartUsage(Long id, PartUsageDTO partUsageDTO) {

        PartUsage existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Part Usage not found with id : " + id));

        existing.setQuantityUsed(partUsageDTO.getQuantityUsed());
        existing.setUsedDate(partUsageDTO.getUsedDate());
        existing.setRemarks(partUsageDTO.getRemarks());

        // Update WorkOrder Relationship
        if (partUsageDTO.getWorkOrderId() != null) {
            WorkOrder workOrder = new WorkOrder();
            workOrder.setId(partUsageDTO.getWorkOrderId());
            existing.setWorkOrder(workOrder);
        }

        // Update Part Relationship
        if (partUsageDTO.getPartId() != null) {
            Part part = new Part();
            part.setId(partUsageDTO.getPartId());
            existing.setPart(part);
        }

        PartUsage updatedPartUsage = repository.save(existing);

        return PartUsageMapper.toDTO(updatedPartUsage);
    }

    @Override
    public void deletePartUsage(Long id) {

        PartUsage partUsage = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Part Usage not found with id : " + id));

        repository.delete(partUsage);
    }
}
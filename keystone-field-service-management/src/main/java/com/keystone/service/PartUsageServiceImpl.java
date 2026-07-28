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
import com.keystone.repository.PartRepository;
import com.keystone.repository.PartUsageRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class PartUsageServiceImpl implements PartUsageService {

	private final PartUsageRepository repository;
	private final PartRepository partRepository;

	public PartUsageServiceImpl(PartUsageRepository repository,
	                            PartRepository partRepository) {
	    this.repository = repository;
	    this.partRepository = partRepository;
	}

	@Override
	@Transactional
	public PartUsageDTO createPartUsage(PartUsageDTO partUsageDTO) {

	    Part part = partRepository.findById(partUsageDTO.getPartId())
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Part not found with id : " + partUsageDTO.getPartId()));

	    if (part.getQuantityInStock() < partUsageDTO.getQuantityUsed()) {
	        throw new IllegalArgumentException("Insufficient stock available.");
	    }

	    part.setQuantityInStock(
	            part.getQuantityInStock() - partUsageDTO.getQuantityUsed());

	    partRepository.save(part);

	    PartUsage partUsage = PartUsageMapper.toEntity(partUsageDTO);

	    partUsage.setPart(part);

	    PartUsage saved = repository.save(partUsage);

	    return PartUsageMapper.toDTO(saved);
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
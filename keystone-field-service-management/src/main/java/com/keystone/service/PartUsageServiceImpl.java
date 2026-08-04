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
import com.keystone.repository.WorkOrderRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class PartUsageServiceImpl implements PartUsageService {

	private final PartUsageRepository repository;
	private final PartRepository partRepository;
	private final WorkOrderRepository workOrderRepository;

	public PartUsageServiceImpl(
	        PartUsageRepository repository,
	        PartRepository partRepository,
	        WorkOrderRepository workOrderRepository) {

	    this.repository = repository;
	    this.partRepository = partRepository;
	    this.workOrderRepository = workOrderRepository;
	}

	@Override
	@Transactional
	public PartUsageDTO createPartUsage(PartUsageDTO partUsageDTO) {

	    Part part = partRepository.findById(partUsageDTO.getPartId())
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Part not found with id : " + partUsageDTO.getPartId()));

	    WorkOrder workOrder = workOrderRepository.findById(partUsageDTO.getWorkOrderId())
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "WorkOrder not found with id : " + partUsageDTO.getWorkOrderId()));
	    
	    if (part.getQuantityInStock() < partUsageDTO.getQuantityUsed()) {
	        throw new IllegalArgumentException("Insufficient stock available.");
	    }

	    part.setQuantityInStock(
	            part.getQuantityInStock() - partUsageDTO.getQuantityUsed());

	    partRepository.save(part);

	    PartUsage partUsage = PartUsageMapper.toEntity(partUsageDTO);

	    partUsage.setPart(part);
	    partUsage.setWorkOrder(workOrder);
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

    @Transactional
    @Override
    public PartUsageDTO updatePartUsage(Long id, PartUsageDTO partUsageDTO) {

        PartUsage existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Part Usage not found with id : " + id));

        Part part = existing.getPart();

        int oldQuantity = existing.getQuantityUsed();
        int newQuantity = partUsageDTO.getQuantityUsed();

        int difference = newQuantity - oldQuantity;

        if (difference > 0 && part.getQuantityInStock() < difference) {
            throw new IllegalArgumentException("Insufficient stock available.");
        }

        part.setQuantityInStock(part.getQuantityInStock() - difference);

        partRepository.save(part);
        
        existing.setQuantityUsed(partUsageDTO.getQuantityUsed());
        existing.setUsedDate(partUsageDTO.getUsedDate());
        existing.setRemarks(partUsageDTO.getRemarks());

        // Update WorkOrder Relationship
        if (partUsageDTO.getWorkOrderId() != null) {
        	WorkOrder workOrder = workOrderRepository.findById(partUsageDTO.getWorkOrderId())
        	        .orElseThrow(() -> new ResourceNotFoundException(
        	                "WorkOrder not found with id : " + partUsageDTO.getWorkOrderId()));

        	existing.setWorkOrder(workOrder);
        }

        PartUsage updatedPartUsage = repository.save(existing);

        return PartUsageMapper.toDTO(updatedPartUsage);
    }

    @Override
    @Transactional
    public void deletePartUsage(Long id) {

        PartUsage partUsage = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Part Usage not found with id : " + id));

        Part part = partUsage.getPart();

        part.setQuantityInStock(
                part.getQuantityInStock() + partUsage.getQuantityUsed());

        partRepository.save(part);

        repository.delete(partUsage);
    }
}
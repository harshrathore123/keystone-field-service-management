package com.keystone.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.keystone.dto.PartDTO;
import com.keystone.entity.Part;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.mapper.PartMapper;
import com.keystone.repository.PartRepository;

@Service
public class PartServiceImpl implements PartService {

    private final PartRepository partRepository;

    public PartServiceImpl(PartRepository partRepository) {
        this.partRepository = partRepository;
    }

    @Override
    public PartDTO createPart(PartDTO partDTO) {

        Part part = PartMapper.toEntity(partDTO);

        Part savedPart = partRepository.save(part);

        return PartMapper.toDTO(savedPart);
    }

    @Override
    public List<PartDTO> getAllParts() {

        return partRepository.findAll()
                .stream()
                .map(PartMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PartDTO getPartById(Long id) {

        Part part = partRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Part not found with id : " + id));

        return PartMapper.toDTO(part);
    }

    @Override
    public PartDTO updatePart(Long id, PartDTO partDTO) {

        Part existingPart = partRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Part not found with id : " + id));

        existingPart.setPartName(partDTO.getPartName());
        existingPart.setPartNumber(partDTO.getPartNumber());
        existingPart.setCategory(partDTO.getCategory());
        existingPart.setQuantityInStock(partDTO.getQuantityInStock());
        existingPart.setUnitPrice(partDTO.getUnitPrice());
        existingPart.setActive(partDTO.getActive());

        Part updatedPart = partRepository.save(existingPart);

        return PartMapper.toDTO(updatedPart);
    }

    @Override
    public void deletePart(Long id) {

        Part part = partRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Part not found with id : " + id));

        partRepository.delete(part);
    }

}
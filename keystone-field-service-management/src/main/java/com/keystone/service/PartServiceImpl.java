package com.keystone.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.keystone.entity.Part;
import com.keystone.repository.PartRepository;

@Service
public class PartServiceImpl implements PartService {

    private final PartRepository partRepository;

    public PartServiceImpl(PartRepository partRepository) {
        this.partRepository = partRepository;
    }

    @Override
    public Part createPart(Part part) {
        return partRepository.save(part);
    }

    @Override
    public List<Part> getAllParts() {
        return partRepository.findAll();
    }

    @Override
    public Part getPartById(Long id) {
        return partRepository.findById(id).orElse(null);
    }

    @Override
    public Part updatePart(Long id, Part part) {

        Part existingPart = partRepository.findById(id).orElse(null);

        if (existingPart != null) {
            existingPart.setPartName(part.getPartName());
            existingPart.setPartNumber(part.getPartNumber());
            existingPart.setCategory(part.getCategory());
            existingPart.setQuantityInStock(part.getQuantityInStock());
            existingPart.setUnitPrice(part.getUnitPrice());
            existingPart.setActive(part.getActive());

            return partRepository.save(existingPart);
        }

        return null;
    }

    @Override
    public void deletePart(Long id) {
        partRepository.deleteById(id);
    }
}
package com.keystone.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.keystone.entity.PartUsage;
import com.keystone.repository.PartUsageRepository;

@Service
public class PartUsageServiceImpl implements PartUsageService {

    private final PartUsageRepository repository;

    public PartUsageServiceImpl(PartUsageRepository repository) {
        this.repository = repository;
    }

    @Override
    public PartUsage createPartUsage(PartUsage partUsage) {
        return repository.save(partUsage);
    }

    @Override
    public List<PartUsage> getAllPartUsages() {
        return repository.findAll();
    }

    @Override
    public PartUsage getPartUsageById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public PartUsage updatePartUsage(Long id, PartUsage partUsage) {

        PartUsage existing = repository.findById(id).orElse(null);

        if (existing != null) {
            existing.setPartName(partUsage.getPartName());
            existing.setQuantityUsed(partUsage.getQuantityUsed());
            existing.setUsedDate(partUsage.getUsedDate());
            existing.setRemarks(partUsage.getRemarks());

            return repository.save(existing);
        }

        return null;
    }

    @Override
    public void deletePartUsage(Long id) {
        repository.deleteById(id);
    }
}
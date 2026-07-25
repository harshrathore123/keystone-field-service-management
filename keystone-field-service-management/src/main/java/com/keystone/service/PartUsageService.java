package com.keystone.service;

import java.util.List;

import com.keystone.dto.PartUsageDTO;

public interface PartUsageService {

    // Create Part Usage
    PartUsageDTO createPartUsage(PartUsageDTO partUsageDTO);

    // Get All Part Usages
    List<PartUsageDTO> getAllPartUsages();

    // Get Part Usage By Id
    PartUsageDTO getPartUsageById(Long id);

    // Update Part Usage
    PartUsageDTO updatePartUsage(Long id, PartUsageDTO partUsageDTO);

    // Delete Part Usage
    void deletePartUsage(Long id);
}
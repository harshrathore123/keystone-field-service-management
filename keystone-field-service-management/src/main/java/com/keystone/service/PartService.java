package com.keystone.service;

import java.util.List;

import com.keystone.dto.PartDTO;

public interface PartService {

    // Create Part
    PartDTO createPart(PartDTO partDTO);

    // Get All Parts
    List<PartDTO> getAllParts();

    // Get Part By Id
    PartDTO getPartById(Long id);

    // Update Part
    PartDTO updatePart(Long id, PartDTO partDTO);

    // Delete Part
    void deletePart(Long id);

}
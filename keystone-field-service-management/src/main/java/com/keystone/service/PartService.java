package com.keystone.service;

import java.util.List;

import com.keystone.entity.Part;

public interface PartService {

    // Create Part
    Part createPart(Part part);

    // Get All Parts
    List<Part> getAllParts();

    // Get Part By Id
    Part getPartById(Long id);

    // Update Part
    Part updatePart(Long id, Part part);

    // Delete Part
    void deletePart(Long id);

}
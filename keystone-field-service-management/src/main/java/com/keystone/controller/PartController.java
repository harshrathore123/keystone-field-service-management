package com.keystone.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.keystone.entity.Part;
import com.keystone.service.PartService;

@RestController
@RequestMapping("/api/parts")
public class PartController {

    private final PartService partService;

    public PartController(PartService partService) {
        this.partService = partService;
    }

    // Create Part
    @PostMapping
    public Part createPart(@RequestBody Part part) {
        return partService.createPart(part);
    }

    // Get All Parts
    @GetMapping
    public List<Part> getAllParts() {
        return partService.getAllParts();
    }

    // Get Part By Id
    @GetMapping("/{id}")
    public Part getPartById(@PathVariable Long id) {
        return partService.getPartById(id);
    }

    // Update Part
    @PutMapping("/{id}")
    public Part updatePart(@PathVariable Long id,
                           @RequestBody Part part) {
        return partService.updatePart(id, part);
    }

    // Delete Part
    @DeleteMapping("/{id}")
    public String deletePart(@PathVariable Long id) {
        partService.deletePart(id);
        return "Part Deleted Successfully";
    }
}
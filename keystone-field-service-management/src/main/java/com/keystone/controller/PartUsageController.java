package com.keystone.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.keystone.entity.PartUsage;
import com.keystone.service.PartUsageService;

@RestController
@RequestMapping("/api/partusage")
public class PartUsageController {

    private final PartUsageService service;

    public PartUsageController(PartUsageService service) {
        this.service = service;
    }

    @PostMapping
    public PartUsage create(@RequestBody PartUsage partUsage) {
        return service.createPartUsage(partUsage);
    }

    @GetMapping
    public List<PartUsage> getAll() {
        return service.getAllPartUsages();
    }

    @GetMapping("/{id}")
    public PartUsage getById(@PathVariable Long id) {
        return service.getPartUsageById(id);
    }

    @PutMapping("/{id}")
    public PartUsage update(@PathVariable Long id,
                            @RequestBody PartUsage partUsage) {
        return service.updatePartUsage(id, partUsage);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.deletePartUsage(id);
        return "Part Usage Deleted Successfully";
    }
}
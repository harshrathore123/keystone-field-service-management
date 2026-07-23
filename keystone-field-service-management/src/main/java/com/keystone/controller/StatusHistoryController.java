package com.keystone.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.keystone.entity.StatusHistory;
import com.keystone.service.StatusHistoryService;

@RestController
@RequestMapping("/api/statushistory")
public class StatusHistoryController {

    private final StatusHistoryService service;

    public StatusHistoryController(StatusHistoryService service) {
        this.service = service;
    }

    @PostMapping
    public StatusHistory create(@RequestBody StatusHistory statusHistory) {
        return service.createStatusHistory(statusHistory);
    }

    @GetMapping
    public List<StatusHistory> getAll() {
        return service.getAllStatusHistories();
    }

    @GetMapping("/{id}")
    public StatusHistory getById(@PathVariable Long id) {
        return service.getStatusHistoryById(id);
    }

    @PutMapping("/{id}")
    public StatusHistory update(@PathVariable Long id,
                                @RequestBody StatusHistory statusHistory) {
        return service.updateStatusHistory(id, statusHistory);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.deleteStatusHistory(id);
        return "Status History Deleted Successfully";
    }
}
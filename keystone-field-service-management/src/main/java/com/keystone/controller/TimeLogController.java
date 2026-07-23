package com.keystone.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.keystone.entity.TimeLog;
import com.keystone.service.TimeLogService;

@RestController
@RequestMapping("/api/timelogs")
public class TimeLogController {

    private final TimeLogService service;

    public TimeLogController(TimeLogService service) {
        this.service = service;
    }

    @PostMapping
    public TimeLog create(@RequestBody TimeLog timeLog) {
        return service.createTimeLog(timeLog);
    }

    @GetMapping
    public List<TimeLog> getAll() {
        return service.getAllTimeLogs();
    }

    @GetMapping("/{id}")
    public TimeLog getById(@PathVariable Long id) {
        return service.getTimeLogById(id);
    }

    @PutMapping("/{id}")
    public TimeLog update(@PathVariable Long id, @RequestBody TimeLog timeLog) {
        return service.updateTimeLog(id, timeLog);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.deleteTimeLog(id);
        return "Time Log Deleted Successfully";
    }
}
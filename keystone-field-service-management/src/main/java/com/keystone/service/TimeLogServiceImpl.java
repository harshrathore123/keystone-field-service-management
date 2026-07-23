package com.keystone.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.keystone.entity.TimeLog;
import com.keystone.repository.TimeLogRepository;

@Service
public class TimeLogServiceImpl implements TimeLogService {

    private final TimeLogRepository repository;

    public TimeLogServiceImpl(TimeLogRepository repository) {
        this.repository = repository;
    }

    @Override
    public TimeLog createTimeLog(TimeLog timeLog) {
        return repository.save(timeLog);
    }

    @Override
    public List<TimeLog> getAllTimeLogs() {
        return repository.findAll();
    }

    @Override
    public TimeLog getTimeLogById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public TimeLog updateTimeLog(Long id, TimeLog timeLog) {

        TimeLog existing = repository.findById(id).orElse(null);

        if (existing != null) {
            existing.setStartTime(timeLog.getStartTime());
            existing.setEndTime(timeLog.getEndTime());
            existing.setHoursWorked(timeLog.getHoursWorked());
            existing.setWorkDescription(timeLog.getWorkDescription());

            return repository.save(existing);
        }

        return null;
    }

    @Override
    public void deleteTimeLog(Long id) {
        repository.deleteById(id);
    }
}
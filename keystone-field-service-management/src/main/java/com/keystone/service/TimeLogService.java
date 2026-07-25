package com.keystone.service;

import java.util.List;

import com.keystone.dto.TimeLogDTO;

public interface TimeLogService {

    // Create Time Log
    TimeLogDTO createTimeLog(TimeLogDTO timeLogDTO);

    // Get All Time Logs
    List<TimeLogDTO> getAllTimeLogs();

    // Get Time Log By Id
    TimeLogDTO getTimeLogById(Long id);

    // Update Time Log
    TimeLogDTO updateTimeLog(Long id, TimeLogDTO timeLogDTO);

    // Delete Time Log
    void deleteTimeLog(Long id);

}
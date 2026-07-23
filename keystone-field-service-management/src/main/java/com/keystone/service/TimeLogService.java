package com.keystone.service;

import java.util.List;

import com.keystone.entity.TimeLog;

public interface TimeLogService {

    TimeLog createTimeLog(TimeLog timeLog);

    List<TimeLog> getAllTimeLogs();

    TimeLog getTimeLogById(Long id);

    TimeLog updateTimeLog(Long id, TimeLog timeLog);

    void deleteTimeLog(Long id);
}
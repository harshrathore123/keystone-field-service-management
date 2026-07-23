package com.keystone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keystone.entity.TimeLog;

public interface TimeLogRepository extends JpaRepository<TimeLog, Long> {

}
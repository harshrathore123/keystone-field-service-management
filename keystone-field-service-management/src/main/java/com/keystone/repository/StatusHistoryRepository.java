package com.keystone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keystone.entity.StatusHistory;

public interface StatusHistoryRepository extends JpaRepository<StatusHistory, Long> {

}
package com.keystone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keystone.entity.StatusHistory;

public interface StatusHistoryRepository extends JpaRepository<StatusHistory, Long> {

    List<StatusHistory> findByWorkOrderId(Long workOrderId);

}
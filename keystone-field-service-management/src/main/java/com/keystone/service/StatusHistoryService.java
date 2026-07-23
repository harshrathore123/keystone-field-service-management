package com.keystone.service;

import java.util.List;

import com.keystone.entity.StatusHistory;

public interface StatusHistoryService {

    StatusHistory createStatusHistory(StatusHistory statusHistory);

    List<StatusHistory> getAllStatusHistories();

    StatusHistory getStatusHistoryById(Long id);

    StatusHistory updateStatusHistory(Long id, StatusHistory statusHistory);

    void deleteStatusHistory(Long id);
}
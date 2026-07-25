package com.keystone.service;

import java.util.List;

import com.keystone.dto.StatusHistoryDTO;

public interface StatusHistoryService {

    // Create Status History
    StatusHistoryDTO createStatusHistory(StatusHistoryDTO statusHistoryDTO);

    // Get All Status Histories
    List<StatusHistoryDTO> getAllStatusHistories();

    // Get Status History By Id
    StatusHistoryDTO getStatusHistoryById(Long id);

    // Update Status History
    StatusHistoryDTO updateStatusHistory(Long id, StatusHistoryDTO statusHistoryDTO);

    // Delete Status History
    void deleteStatusHistory(Long id);
}
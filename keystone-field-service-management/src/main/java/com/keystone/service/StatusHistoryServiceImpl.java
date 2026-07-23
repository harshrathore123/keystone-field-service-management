package com.keystone.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.keystone.entity.StatusHistory;
import com.keystone.repository.StatusHistoryRepository;

@Service
public class StatusHistoryServiceImpl implements StatusHistoryService {

    private final StatusHistoryRepository repository;

    public StatusHistoryServiceImpl(StatusHistoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public StatusHistory createStatusHistory(StatusHistory statusHistory) {
        return repository.save(statusHistory);
    }

    @Override
    public List<StatusHistory> getAllStatusHistories() {
        return repository.findAll();
    }

    @Override
    public StatusHistory getStatusHistoryById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public StatusHistory updateStatusHistory(Long id, StatusHistory statusHistory) {

        StatusHistory existing = repository.findById(id).orElse(null);

        if (existing != null) {
            existing.setOldStatus(statusHistory.getOldStatus());
            existing.setNewStatus(statusHistory.getNewStatus());
            existing.setChangedBy(statusHistory.getChangedBy());
            existing.setChangedDate(statusHistory.getChangedDate());
            existing.setRemarks(statusHistory.getRemarks());

            return repository.save(existing);
        }

        return null;
    }

    @Override
    public void deleteStatusHistory(Long id) {
        repository.deleteById(id);
    }
}
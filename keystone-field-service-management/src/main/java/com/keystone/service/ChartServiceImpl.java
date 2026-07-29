package com.keystone.service;

import org.springframework.stereotype.Service;

import com.keystone.dto.ChartDataDTO;
import com.keystone.repository.WorkOrderRepository;

@Service
public class ChartServiceImpl implements ChartService {

    private final WorkOrderRepository workOrderRepository;

    public ChartServiceImpl(WorkOrderRepository workOrderRepository) {
        this.workOrderRepository = workOrderRepository;
    }

    @Override
    public ChartDataDTO getChartData() {

        ChartDataDTO dto = new ChartDataDTO();

        dto.setTotalJobs(workOrderRepository.count());

        dto.setNewJobs(workOrderRepository.countByStatus("NEW"));

        dto.setAssignedJobs(workOrderRepository.countByStatus("ASSIGNED"));

        dto.setInProgressJobs(workOrderRepository.countByStatus("IN_PROGRESS"));

        dto.setOnHoldJobs(workOrderRepository.countByStatus("ON_HOLD"));

        dto.setCompletedJobs(workOrderRepository.countByStatus("COMPLETED"));

        dto.setClosedJobs(workOrderRepository.countByStatus("CLOSED"));

        dto.setCancelledJobs(workOrderRepository.countByStatus("CANCELLED"));

        return dto;
    }
}
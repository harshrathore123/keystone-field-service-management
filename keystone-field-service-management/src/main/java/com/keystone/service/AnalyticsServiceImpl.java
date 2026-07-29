package com.keystone.service;

import org.springframework.stereotype.Service;

import com.keystone.dto.AnalyticsDTO;
import com.keystone.repository.WorkOrderRepository;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {

    private final WorkOrderRepository workOrderRepository;

    public AnalyticsServiceImpl(WorkOrderRepository workOrderRepository) {
        this.workOrderRepository = workOrderRepository;
    }

    @Override
    public AnalyticsDTO getAnalytics() {

        AnalyticsDTO analytics = new AnalyticsDTO();

        long total = workOrderRepository.count();
        long completed = workOrderRepository.countByStatus("COMPLETED");
        long pending = total - completed;

        analytics.setTotalWorkOrders(total);
        analytics.setCompletedWorkOrders(completed);
        analytics.setPendingWorkOrders(pending);

        // TODO: Update after overdue query is implemented
        analytics.setOverdueWorkOrders(
                workOrderRepository.countByStatus("OVERDUE"));

        if (total > 0) {
            analytics.setCompletionRatePercentage((completed * 100.0) / total);
            analytics.setSlaCompliancePercentage((completed * 100.0) / total);
        } else {
            analytics.setCompletionRatePercentage(0);
            analytics.setSlaCompliancePercentage(0);
        }

        return analytics;
    }
}
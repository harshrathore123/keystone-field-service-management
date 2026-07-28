package com.keystone.service;

import org.springframework.stereotype.Service;

import com.keystone.dto.ReportDTO;
import com.keystone.repository.CustomerRepository;
import com.keystone.repository.SiteRepository;
import com.keystone.repository.UserRepository;
import com.keystone.repository.WorkOrderRepository;

@Service
public class ReportServiceImpl implements ReportService {

    private final CustomerRepository customerRepository;
    private final SiteRepository siteRepository;
    private final UserRepository userRepository;
    private final WorkOrderRepository workOrderRepository;

    public ReportServiceImpl(CustomerRepository customerRepository,
                             SiteRepository siteRepository,
                             UserRepository userRepository,
                             WorkOrderRepository workOrderRepository) {

        this.customerRepository = customerRepository;
        this.siteRepository = siteRepository;
        this.userRepository = userRepository;
        this.workOrderRepository = workOrderRepository;
    }

    @Override
    public ReportDTO getReportSummary() {

        ReportDTO report = new ReportDTO();

        report.setTotalCustomers(customerRepository.count());
        report.setTotalSites(siteRepository.count());
        report.setTotalTechnicians(userRepository.count());
        report.setTotalWorkOrders(workOrderRepository.count());

        report.setNewWorkOrders(workOrderRepository.countByStatus("NEW"));
        report.setAssignedWorkOrders(workOrderRepository.countByStatus("ASSIGNED"));
        report.setInProgressWorkOrders(workOrderRepository.countByStatus("IN_PROGRESS"));
        report.setCompletedWorkOrders(workOrderRepository.countByStatus("COMPLETED"));
        report.setOnHoldWorkOrders(workOrderRepository.countByStatus("ON_HOLD"));
        report.setClosedWorkOrders(workOrderRepository.countByStatus("CLOSED"));
        report.setCancelledWorkOrders(workOrderRepository.countByStatus("CANCELLED"));

        return report;
    }
}
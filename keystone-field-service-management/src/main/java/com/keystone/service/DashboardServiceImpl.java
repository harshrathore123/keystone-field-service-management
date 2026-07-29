package com.keystone.service;

import org.springframework.stereotype.Service;

import com.keystone.dto.DashboardDTO;
import com.keystone.repository.CustomerRepository;
import com.keystone.repository.SiteRepository;
import com.keystone.repository.UserRepository;
import com.keystone.repository.WorkOrderRepository;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final CustomerRepository customerRepository;
    private final SiteRepository siteRepository;
    private final WorkOrderRepository workOrderRepository;
    private final UserRepository userRepository;

    public DashboardServiceImpl(CustomerRepository customerRepository,
                                SiteRepository siteRepository,
                                WorkOrderRepository workOrderRepository,
                                UserRepository userRepository) {

        this.customerRepository = customerRepository;
        this.siteRepository = siteRepository;
        this.workOrderRepository = workOrderRepository;
        this.userRepository = userRepository;
    }

    @Override
    public DashboardDTO getDashboardSummary() {

        DashboardDTO dashboard = new DashboardDTO();

        dashboard.setTotalCustomers(customerRepository.count());

        dashboard.setTotalSites(siteRepository.count());

        dashboard.setTotalWorkOrders(workOrderRepository.count());

        dashboard.setTotalTechnicians(
                userRepository.countByRole("TECHNICIAN"));

        dashboard.setNewWorkOrders(workOrderRepository.countByStatus("NEW"));

        dashboard.setAssignedWorkOrders(workOrderRepository.countByStatus("ASSIGNED"));

        dashboard.setInProgressWorkOrders(workOrderRepository.countByStatus("IN_PROGRESS"));

        dashboard.setCompletedWorkOrders(workOrderRepository.countByStatus("COMPLETED"));

        return dashboard;
    }

}
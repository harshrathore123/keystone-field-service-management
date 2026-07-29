package com.keystone.service;

import com.keystone.dto.CustomerDashboardDTO;
import com.keystone.dto.CustomerRequestDTO;
import com.keystone.dto.WorkOrderDTO;

import java.util.List;

public interface CustomerPortalService {

    // Raise Service Request
    WorkOrderDTO raiseServiceRequest(CustomerRequestDTO requestDTO);

    // Customer Dashboard
    CustomerDashboardDTO getDashboard();

    // View My Requests
    List<WorkOrderDTO> getMyRequests();

    // View Single Request
    WorkOrderDTO getRequestById(Long workOrderId);

}
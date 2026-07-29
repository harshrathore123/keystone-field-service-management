package com.keystone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDashboardDTO {

    private long totalRequests;

    private long newRequests;

    private long assignedRequests;

    private long inProgressRequests;

    private long onHoldRequests;

    private long completedRequests;

    private long closedRequests;

    private long cancelledRequests;

}
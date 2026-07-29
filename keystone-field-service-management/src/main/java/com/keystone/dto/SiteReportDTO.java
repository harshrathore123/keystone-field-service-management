package com.keystone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SiteReportDTO {

    private Long siteId;

    private String siteName;

    private Long totalWorkOrders;

    private Long completedWorkOrders;

    private Long pendingWorkOrders;

    private Double completionPercentage;

}
package com.keystone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class WorkOrderDTO {

    private Long id;

    private String workOrderNumber;

    private String title;

    private String description;

    private String priority;

    private String status;

    private String scheduledDate;

    private Boolean active;

    // Relationship IDs
    private Long customerId;

    private Long siteId;

    private Long assignedUserId;
}
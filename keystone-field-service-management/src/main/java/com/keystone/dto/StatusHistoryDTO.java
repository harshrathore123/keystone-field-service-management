package com.keystone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StatusHistoryDTO {

    private Long id;

    private String oldStatus;

    private String newStatus;

    private String changedBy;

    private String changedDate;

    private String remarks;

    // Relationship ID
    private Long workOrderId;
}
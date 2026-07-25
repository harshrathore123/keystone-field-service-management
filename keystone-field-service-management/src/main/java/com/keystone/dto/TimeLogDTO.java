package com.keystone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TimeLogDTO {

    private Long id;

    private String startTime;

    private String endTime;

    private Double hoursWorked;

    private String workDescription;

    // Relationship ID
    private Long workOrderId;
}
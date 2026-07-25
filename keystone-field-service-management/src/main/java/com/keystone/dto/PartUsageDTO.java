package com.keystone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PartUsageDTO {

    private Long id;

    private Integer quantityUsed;

    private String usedDate;

    private String remarks;

    // Relationship IDs
    private Long workOrderId;

    private Long partId;
}
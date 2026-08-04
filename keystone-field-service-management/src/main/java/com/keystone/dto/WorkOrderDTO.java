package com.keystone.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkOrderDTO {

    private Long id;

    @NotBlank(message = "Work Order Number is required.")
    private String workOrderNumber;

    @NotBlank(message = "Title is required.")
    private String title;

    private String description;

    @NotBlank(message = "Priority is required.")
    private String priority;

    private String status;

    @NotBlank(message = "Scheduled Date is required.")
    private String scheduledDate;

    private String slaDate;

    @NotNull(message = "Active status is required.")
    private Boolean active;

    // Relationships
    @NotNull(message = "Customer Id is required.")
    private Long customerId;

    @NotNull(message = "Site Id is required.")
    private Long siteId;

    // Technician can be assigned later
    private Long assignedUserId;
    
    private String customerName;

    private String siteName;

    private String assignedTechnicianName;
}
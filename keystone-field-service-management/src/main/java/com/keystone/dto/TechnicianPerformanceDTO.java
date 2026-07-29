package com.keystone.dto;

public class TechnicianPerformanceDTO {

    private Long technicianId;
    private String technicianName;

    private Long totalAssignedWorkOrders;
    private Long completedWorkOrders;
    private Long pendingWorkOrders;
    private Double completionPercentage;

    public TechnicianPerformanceDTO() {
    }

    public Long getTechnicianId() {
        return technicianId;
    }

    public void setTechnicianId(Long technicianId) {
        this.technicianId = technicianId;
    }

    public String getTechnicianName() {
        return technicianName;
    }

    public void setTechnicianName(String technicianName) {
        this.technicianName = technicianName;
    }

    public Long getTotalAssignedWorkOrders() {
        return totalAssignedWorkOrders;
    }

    public void setTotalAssignedWorkOrders(Long totalAssignedWorkOrders) {
        this.totalAssignedWorkOrders = totalAssignedWorkOrders;
    }

    public Long getCompletedWorkOrders() {
        return completedWorkOrders;
    }

    public void setCompletedWorkOrders(Long completedWorkOrders) {
        this.completedWorkOrders = completedWorkOrders;
    }

    public Long getPendingWorkOrders() {
        return pendingWorkOrders;
    }

    public void setPendingWorkOrders(Long pendingWorkOrders) {
        this.pendingWorkOrders = pendingWorkOrders;
    }

    public Double getCompletionPercentage() {
        return completionPercentage;
    }

    public void setCompletionPercentage(Double completionPercentage) {
        this.completionPercentage = completionPercentage;
    }
}
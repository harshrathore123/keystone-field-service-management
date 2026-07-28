package com.keystone.dto;

public class DashboardDTO {

    private Long totalCustomers;

    private Long totalSites;

    private Long totalWorkOrders;

    private Long totalTechnicians;

    private Long newWorkOrders;

    private Long assignedWorkOrders;

    private Long inProgressWorkOrders;

    private Long completedWorkOrders;

    public DashboardDTO() {
    }

    public Long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(Long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }

    public Long getTotalSites() {
        return totalSites;
    }

    public void setTotalSites(Long totalSites) {
        this.totalSites = totalSites;
    }

    public Long getTotalWorkOrders() {
        return totalWorkOrders;
    }

    public void setTotalWorkOrders(Long totalWorkOrders) {
        this.totalWorkOrders = totalWorkOrders;
    }

    public Long getTotalTechnicians() {
        return totalTechnicians;
    }

    public void setTotalTechnicians(Long totalTechnicians) {
        this.totalTechnicians = totalTechnicians;
    }

    public Long getNewWorkOrders() {
        return newWorkOrders;
    }

    public void setNewWorkOrders(Long newWorkOrders) {
        this.newWorkOrders = newWorkOrders;
    }

    public Long getAssignedWorkOrders() {
        return assignedWorkOrders;
    }

    public void setAssignedWorkOrders(Long assignedWorkOrders) {
        this.assignedWorkOrders = assignedWorkOrders;
    }

    public Long getInProgressWorkOrders() {
        return inProgressWorkOrders;
    }

    public void setInProgressWorkOrders(Long inProgressWorkOrders) {
        this.inProgressWorkOrders = inProgressWorkOrders;
    }

    public Long getCompletedWorkOrders() {
        return completedWorkOrders;
    }

    public void setCompletedWorkOrders(Long completedWorkOrders) {
        this.completedWorkOrders = completedWorkOrders;
    }

}
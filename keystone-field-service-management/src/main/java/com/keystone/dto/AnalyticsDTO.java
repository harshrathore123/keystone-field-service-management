package com.keystone.dto;

public class AnalyticsDTO {

    private long totalWorkOrders;
    private long completedWorkOrders;
    private long pendingWorkOrders;
    private long overdueWorkOrders;

    private double slaCompliancePercentage;
    private double completionRatePercentage;

    public AnalyticsDTO() {
    }

    public long getTotalWorkOrders() {
        return totalWorkOrders;
    }

    public void setTotalWorkOrders(long totalWorkOrders) {
        this.totalWorkOrders = totalWorkOrders;
    }

    public long getCompletedWorkOrders() {
        return completedWorkOrders;
    }

    public void setCompletedWorkOrders(long completedWorkOrders) {
        this.completedWorkOrders = completedWorkOrders;
    }

    public long getPendingWorkOrders() {
        return pendingWorkOrders;
    }

    public void setPendingWorkOrders(long pendingWorkOrders) {
        this.pendingWorkOrders = pendingWorkOrders;
    }

    public long getOverdueWorkOrders() {
        return overdueWorkOrders;
    }

    public void setOverdueWorkOrders(long overdueWorkOrders) {
        this.overdueWorkOrders = overdueWorkOrders;
    }

    public double getSlaCompliancePercentage() {
        return slaCompliancePercentage;
    }

    public void setSlaCompliancePercentage(double slaCompliancePercentage) {
        this.slaCompliancePercentage = slaCompliancePercentage;
    }

    public double getCompletionRatePercentage() {
        return completionRatePercentage;
    }

    public void setCompletionRatePercentage(double completionRatePercentage) {
        this.completionRatePercentage = completionRatePercentage;
    }
}
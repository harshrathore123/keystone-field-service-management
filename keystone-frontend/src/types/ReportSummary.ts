export interface ReportSummary {
  totalCustomers: number;
  totalSites: number;
  totalTechnicians: number;
  totalWorkOrders: number;

  newWorkOrders: number;
  assignedWorkOrders: number;
  inProgressWorkOrders: number;
  completedWorkOrders: number;
  onHoldWorkOrders: number;
  closedWorkOrders: number;
  cancelledWorkOrders: number;
}
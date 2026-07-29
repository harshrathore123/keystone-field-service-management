export interface WorkOrder {
  id?: number;

  workOrderNumber: string;
  title: string;
  description: string;

  priority: string;
  status: string;

  scheduledDate: string;
  slaDate: string;

  active: boolean;

  customerId: number;
  siteId: number;

  assignedUserId?: number | null;
}
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

  customerId: number | "";
  customerName?: string;

  siteId: number | "";
  siteName?: string;

  assignedUserId?: number | null;
  assignedTechnicianName?: string;
}
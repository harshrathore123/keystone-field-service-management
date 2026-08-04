export interface PartUsage {
  id?: number;

  quantityUsed: number;
  usedDate: string;
  remarks: string;

  workOrderId: number;
  partId: number;

  workOrderNumber?: string;
  workOrderTitle?: string;

  partName?: string;
  partNumber?: string;
}
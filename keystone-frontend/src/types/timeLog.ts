export interface TimeLog {
  id?: number;

  startTime: string;
  endTime: string;
  hoursWorked: number;
  workDescription: string;

  workOrderId: number;

  workOrderNumber?: string;
  workOrderTitle?: string;
}
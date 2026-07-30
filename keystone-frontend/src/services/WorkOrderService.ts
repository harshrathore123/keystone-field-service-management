import axiosInstance from "../api/axios";
import type { WorkOrder } from "../types/WorkOrder";

const API_URL = "/workorders";

class WorkOrderService {
  async getAllWorkOrders(): Promise<WorkOrder[]> {
    const response = await axiosInstance.get(API_URL);
    return response.data.data;
  }

  async getWorkOrderById(id: number): Promise<WorkOrder> {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data.data;
  }

  async createWorkOrder(workOrder: WorkOrder): Promise<WorkOrder> {
    const response = await axiosInstance.post(API_URL, workOrder);
    return response.data.data;
  }

  async updateWorkOrder(
    id: number,
    workOrder: WorkOrder
  ): Promise<WorkOrder> {
    const response = await axiosInstance.put(
      `${API_URL}/${id}`,
      workOrder
    );
    return response.data.data;
  }

  async deleteWorkOrder(id: number): Promise<void> {
    await axiosInstance.delete(`${API_URL}/${id}`);
  }

  async searchWorkOrders(keyword: string): Promise<WorkOrder[]> {
    const response = await axiosInstance.get(
      `${API_URL}/search?keyword=${keyword}`
    );
    return response.data.data;
  }

  async getWorkOrdersWithPagination(page: number, size: number) {
    const response = await axiosInstance.get(
      `${API_URL}/page?page=${page}&size=${size}`
    );
    return response.data.data;
  }

  async assignTechnician(
    workOrderId: number,
    userId: number
  ): Promise<WorkOrder> {
    const response = await axiosInstance.put(
      `${API_URL}/${workOrderId}/assign-technician/${userId}`,
      null
    );
    return response.data.data;
  }

  async updatePriority(
    workOrderId: number,
    priority: string
  ): Promise<WorkOrder> {
    const response = await axiosInstance.put(
      `${API_URL}/${workOrderId}/priority/${priority}`,
      null
    );
    return response.data.data;
  }

  async updateStatus(
    workOrderId: number,
    status: string
  ): Promise<WorkOrder> {
    const response = await axiosInstance.put(
      `${API_URL}/${workOrderId}/status/${status}`,
      null
    );
    return response.data.data;
  }

  async updateSlaDate(
    workOrderId: number,
    slaDate: string
  ): Promise<WorkOrder> {
    const response = await axiosInstance.put(
      `${API_URL}/${workOrderId}/sla-date/${slaDate}`,
      null
    );
    return response.data.data;
  }

  async getMyAssignedJobs(): Promise<WorkOrder[]> {
    const response = await axiosInstance.get(
      `${API_URL}/my-jobs`
    );
    return response.data.data;
  }

  async startJob(id: number): Promise<WorkOrder> {
    const response = await axiosInstance.put(
      `${API_URL}/${id}/start`,
      null
    );
    return response.data.data;
  }

  async pauseJob(id: number): Promise<WorkOrder> {
    const response = await axiosInstance.put(
      `${API_URL}/${id}/pause`,
      null
    );
    return response.data.data;
  }

  async resumeJob(id: number): Promise<WorkOrder> {
    const response = await axiosInstance.put(
      `${API_URL}/${id}/resume`,
      null
    );
    return response.data.data;
  }

  async completeJob(id: number): Promise<WorkOrder> {
    const response = await axiosInstance.put(
      `${API_URL}/${id}/complete`,
      null
    );
    return response.data.data;
  }
}

export default new WorkOrderService();
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

  async updateWorkOrder(id: number, workOrder: WorkOrder): Promise<WorkOrder> {
    const response = await axiosInstance.put(`${API_URL}/${id}`, workOrder);
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

  async getWorkOrdersWithPagination(
    page: number,
    size: number
  ) {
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
      `${API_URL}/${workOrderId}/assign-technician/${userId}`
    );

    return response.data.data;
  }

  async updatePriority(
    workOrderId: number,
    priority: string
  ): Promise<WorkOrder> {
    const response = await axiosInstance.put(
      `${API_URL}/${workOrderId}/priority/${priority}`
    );

    return response.data.data;
  }

  async updateStatus(
    workOrderId: number,
    status: string
  ): Promise<WorkOrder> {
    const response = await axiosInstance.put(
      `${API_URL}/${workOrderId}/status/${status}`
    );

    return response.data.data;
  }

  async updateSlaDate(
    workOrderId: number,
    slaDate: string
  ): Promise<WorkOrder> {
    const response = await axiosInstance.put(
      `${API_URL}/${workOrderId}/sla-date/${slaDate}`
    );

    return response.data.data;
  }

  async getMyAssignedJobs(): Promise<WorkOrder[]> {
    const response = await axiosInstance.get(
      `${API_URL}/my-jobs`
    );

    return response.data.data;
  }

  async startJob(workOrderId: number): Promise<WorkOrder> {
    const response = await axiosInstance.put(
      `${API_URL}/${workOrderId}/start`
    );

    return response.data.data;
  }

  async pauseJob(workOrderId: number): Promise<WorkOrder> {
    const response = await axiosInstance.put(
      `${API_URL}/${workOrderId}/pause`
    );

    return response.data.data;
  }

  async resumeJob(workOrderId: number): Promise<WorkOrder> {
    const response = await axiosInstance.put(
      `${API_URL}/${workOrderId}/resume`
    );

    return response.data.data;
  }

  async completeJob(workOrderId: number): Promise<WorkOrder> {
    const response = await axiosInstance.put(
      `${API_URL}/${workOrderId}/complete`
    );

    return response.data.data;
  }
}

export default new WorkOrderService();
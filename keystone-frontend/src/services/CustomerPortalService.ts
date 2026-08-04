import api from "../api/axios";
import type { WorkOrder } from "../types/WorkOrder";

export interface CustomerRequest {
  title: string;
  description: string;
  priority: string;
  siteId: number;
}

export interface CustomerDashboard {
  totalRequests: number;
  openRequests: number;
  completedRequests: number;
}

class CustomerPortalService {
  async getDashboard(): Promise<CustomerDashboard> {
    const response = await api.get("/customer/dashboard");
    return response.data;
  }

  async getMyRequests(): Promise<WorkOrder[]> {
    console.log("GET /customer/requests API CALLED");

    const response = await api.get("/customer/requests");

    console.log("REQUEST RESPONSE =>", response.data);

    return response.data;
  }

  async getRequestById(id: number): Promise<WorkOrder> {
    const response = await api.get(`/customer/requests/${id}`);
    return response.data;
  }

  async raiseRequest(request: CustomerRequest): Promise<WorkOrder> {
    const response = await api.post("/customer/request", request);

    return response.data;
  }
}

export default new CustomerPortalService();

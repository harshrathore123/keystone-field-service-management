import api from "../api/axios";
import type { Site } from "../types/Site";

interface ApiResponse<T> {
  timestamp: string;
  status: number;
  success: boolean;
  message: string;
  data: T;
}

// Get All Sites
export const getAllSites = async (): Promise<Site[]> => {
  const response = await api.get<ApiResponse<Site[]>>("/sites");
  return response.data.data;
};

// Get Site By Id
export const getSiteById = async (id: number): Promise<Site> => {
  const response = await api.get<ApiResponse<Site>>(`/sites/${id}`);
  return response.data.data;
};

// Create Site
export const createSite = async (site: Site): Promise<Site> => {
  const response = await api.post<ApiResponse<Site>>("/sites", site);
  return response.data.data;
};

// Update Site
export const updateSite = async (
  id: number,
  site: Site
): Promise<Site> => {
  const response = await api.put<ApiResponse<Site>>(
    `/sites/${id}`,
    site
  );
  return response.data.data;
};

// Delete Site
export const deleteSite = async (id: number): Promise<void> => {
  await api.delete(`/sites/${id}`);
};
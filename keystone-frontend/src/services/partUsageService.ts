import api from "../api/axios";
import type { PartUsage } from "../types/partUsage";

interface ApiResponse<T> {
  timestamp: string;
  status: number;
  success: boolean;
  message: string;
  data: T;
}

export const getAllPartUsages = async (): Promise<PartUsage[]> => {
  const response =
    await api.get<ApiResponse<PartUsage[]>>("/part-usage");

  return response.data.data;
};

export const createPartUsage = async (
  partUsage: PartUsage,
): Promise<PartUsage> => {
  const response =
    await api.post<ApiResponse<PartUsage>>(
      "/part-usage",
      partUsage,
    );

  return response.data.data;
};

export const updatePartUsage = async (
  id: number,
  partUsage: PartUsage,
): Promise<PartUsage> => {
  const response =
    await api.put<ApiResponse<PartUsage>>(
      `/part-usage/${id}`,
      partUsage,
    );

  return response.data.data;
};

export const deletePartUsage = async (
  id: number,
): Promise<void> => {
  await api.delete(`/part-usage/${id}`);
};
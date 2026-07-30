import api from "../api/axios";
import type { Part } from "../types/Part";

interface ApiResponse<T> {
  timestamp: string;
  status: number;
  success: boolean;
  message: string;
  data: T;
}

// Get All Parts
export const getAllParts = async (): Promise<Part[]> => {
  const response = await api.get<ApiResponse<Part[]>>("/parts");
  return response.data.data;
};

// Get Part By Id
export const getPartById = async (id: number): Promise<Part> => {
  const response = await api.get<ApiResponse<Part>>(`/parts/${id}`);
  return response.data.data;
};

// Create Part
export const createPart = async (
  part: Part
): Promise<Part> => {
  const response = await api.post<ApiResponse<Part>>(
    "/parts",
    part
  );

  return response.data.data;
};

// Update Part
export const updatePart = async (
  id: number,
  part: Part
): Promise<Part> => {
  const response = await api.put<ApiResponse<Part>>(
    `/parts/${id}`,
    part
  );

  return response.data.data;
};

// Delete Part
export const deletePart = async (
  id: number
): Promise<void> => {
  await api.delete(`/parts/${id}`);
};
import api from "../api/axios";
import type { Technician } from "../types/Technician";

interface ApiResponse<T> {
  timestamp: string;
  status: number;
  success: boolean;
  message: string;
  data: T;
}

// Get All Technicians
export const getAllTechnicians = async (): Promise<Technician[]> => {
  const response = await api.get<ApiResponse<Technician[]>>("/users/technicians");
  return response.data.data;
};

// Create Technician
export const createTechnician = async (
  technician: Technician
): Promise<Technician> => {
  const response = await api.post<ApiResponse<Technician>>(
    "/users/technicians",
    technician
  );
  return response.data.data;
};

// Update Technician
export const updateTechnician = async (
  id: number,
  technician: Technician
): Promise<Technician> => {
  const response = await api.put<ApiResponse<Technician>>(
    `/users/technicians/${id}`,
    technician
  );
  return response.data.data;
};

// Delete Technician
export const deleteTechnician = async (id: number): Promise<void> => {
  await api.delete(`/users/technicians/${id}`);
};
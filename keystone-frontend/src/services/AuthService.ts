import api from "../api/axios";
import type { LoginRequest, LoginResponse } from "../types/auth";

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", request);

  return response.data;
};

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const changePassword = async (
  request: ChangePasswordRequest,
): Promise<string> => {
  const response = await api.put(
    "/users/change-password",
    request,
  );

  return response.data;
};

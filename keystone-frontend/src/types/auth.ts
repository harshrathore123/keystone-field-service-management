export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  message: string;
  role: string;

  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
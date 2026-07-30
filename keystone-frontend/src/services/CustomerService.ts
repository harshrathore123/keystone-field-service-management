import api from "../api/axios";
import type { Customer } from "../types/Customer";

interface ApiResponse<T> {
  timestamp: string;
  status: number;
  success: boolean;
  message: string;
  data: T;
}

// Get All Customers
export const getAllCustomers = async (): Promise<Customer[]> => {
  const response = await api.get<ApiResponse<Customer[]>>("/customers");
  return response.data.data;
};

// Get Customer By Id
export const getCustomerById = async (id: number): Promise<Customer> => {
  const response = await api.get<ApiResponse<Customer>>(`/customers/${id}`);
  return response.data.data;
};

// Create Customer
export const createCustomer = async (customer: Customer): Promise<Customer> => {
  const response = await api.post<ApiResponse<Customer>>(
    "/customers",
    customer,
  );
  return response.data.data;
};

// Update Customer
export const updateCustomer = async (
  id: number,
  customer: Customer,
): Promise<Customer> => {
  const response = await api.put<ApiResponse<Customer>>(
    `/customers/${id}`,
    customer,
  );
  return response.data.data;
};

// Delete Customer
export const deleteCustomer = async (id: number): Promise<void> => {
  await api.delete(`/customers/${id}`);
};

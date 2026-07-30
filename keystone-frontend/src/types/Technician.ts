export interface Technician {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phoneNumber: string;
  role: string;
  active: boolean;
}
export interface Site {
  id?: number;
  siteName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  active: boolean;
  customerId: number;
}
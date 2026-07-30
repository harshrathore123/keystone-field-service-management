export interface Part {
  id?: number;
  partName: string;
  partNumber: string;
  category: string;
  quantityInStock: number;
  unitPrice: number;
  active: boolean;
}
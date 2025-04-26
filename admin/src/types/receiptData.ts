export interface PaymentItem {
  type: string;
  amount: number;
}

export interface ReceiptData {
  date: string;
  tenant: string;
  property: string;
  owner: string;
  rentMonth: string;
  payments: { type: string; amount: number; confirmed: boolean }[];
  taxes: { type: string; amount: number; confirmed: boolean }[];
  discount: number;
  total: number;
}

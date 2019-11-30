export interface CreditCard {
  provider: "mastercard" | "visa" | "discover";
  number: number;
  expMonth: number;
  expYear: number;
  cvv: number;
}

export interface Transaction {
  ipAddress: string;
  orderID: string;
  shippingID: string;
  id: string;
  timestamp: string;
}

export interface BillingData {
  startDate: string;
  endDate: string;
  transactions: Transaction;
}

export type NewBillingData = BillingData;

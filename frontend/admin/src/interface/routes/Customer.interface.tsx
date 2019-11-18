import { AccountData, NewAccountData } from "./Account.interface";

export interface CustomerData extends AccountData {
  ordersID: string[];
  lastOrderDate: string;
}

export type NewCustomerData = Omit<
  Omit<CustomerData, keyof AccountData>,
  "ordersID" | "lastOrderDate"
> &
  NewAccountData;

import { AccountCanPayDOT } from "../Account.interface";

export interface CustomerDOT extends AccountCanPayDOT {
  accountID: string;
  orderIDs: string[];
  lastOrderDate: string;
  paymentsID: string;
}

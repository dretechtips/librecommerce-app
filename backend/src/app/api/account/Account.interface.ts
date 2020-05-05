import { AlertDependentDOT } from "../alert/Alert.interface";
import { PaymentsDependentDOT } from "../billing/payments/Payments.interface";
import { SubscriptionDependentDOT } from "../sale/subscription/Subscription.interface";

export interface AccountDOT extends AlertDependentDOT, PaymentsDependentDOT, SubscriptionDependentDOT {
  lastOrderDate: Date;
  username: string;
  password: string;
  fingerprints: string[];
  active: boolean;
}

/**
 * 2 - 3 Letter Code
 */
export enum AccountType {
  CUSTOMER = "CS",
  COMPANY = "CO",
  STORE = "ST",
  EMPLOYEE = "EM",
  NONE = "NO"
}

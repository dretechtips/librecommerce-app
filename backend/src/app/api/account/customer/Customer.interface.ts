import { SubscriptionDependentDOT } from "../../sale/subscription/Subscription.interface";
import { AccountDOT } from "../Account.interface";

export interface CustomerDOT extends AccountDOT {
  
}

export interface CustomerDependentDOT {
  customerID: string;
}

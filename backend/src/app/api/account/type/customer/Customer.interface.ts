import { PaymentsDependentDOT } from "../../../billing/payments/Payments.interface";
import { SaleDependentDOT } from "../../../sale/Sale.interface";
import { SubscriptionDependentDOT } from "../../../sale/subscription/Subscription.interface";
import { AccountDependentDOT } from "../../Account.interface";

export interface CustomerDOT
  extends SubscriptionDependentDOT,
    SaleDependentDOT,
    AccountDependentDOT,
    PaymentsDependentDOT {
  lastOrderDate: Date;
}

export interface CustomerDependentDOT {
  customerID: string;
}

import { SubscriptionLink } from "../../subscription/Subscription.interface";

export interface CustomerDOT extends SubscriptionLink {
  accountID: string;
  orderIDs: string[];
  lastOrderDate: string;
  paymentsID: string;
}

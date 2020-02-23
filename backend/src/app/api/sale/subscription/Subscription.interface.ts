export interface SubscriptionDOT {
  name: string;
  productIDs: string[];
  discount?: number;
  active: boolean;
}

export interface SubscriptionDependentDOT {
  subscriptionIDs: string[];
}

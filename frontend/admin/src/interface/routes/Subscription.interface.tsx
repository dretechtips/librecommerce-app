export interface BundleSubscriptionData extends SubscriptionData {
  discount: number;
}

export interface SubscriptionData {
  productIDs: string[];
  name: string;
  id: string;
}

export type NewBundleSubscriptionData = Omit<BundleSubscriptionData, "id">;

export type NewSubscriptionData = Omit<SubscriptionData, "id">;

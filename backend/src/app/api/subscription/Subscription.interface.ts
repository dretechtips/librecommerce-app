import { CartProductDOT } from "../cart/Cart.interface";

export interface SubscriptionDOT {
  name: string;
  products: CartProductDOT[];
  discount?: number;
  active: boolean;
}

export interface SubscriptionLink {
  subscriptionIDs: string[];
}

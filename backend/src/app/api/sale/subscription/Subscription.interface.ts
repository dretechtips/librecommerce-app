import { Document } from "mongoose";

export interface SubscriptionDOT {
  name: string;
  productIDs: string[];
  discount?: number;
  active: boolean;
}

export interface SubscriptionDependentDOT {
  subscriptionIDs: string[];
}

export interface SubscriptionDependentService<T extends SubscriptionDependentDOT> {
  /**
   * Removes subscription from access
   * @param id T ID
   * @param index Subscription ID
   */
  unsubscribe(id: string, sID: string): Promise<T & Document>;
  /**
   * Creates a subscription and adds it to container.
   * @param id T ID
   * @param subscription Subscription DOT 
   */
  subscribe(id: string, subscription: SubscriptionDOT): Promise<T & Document>;
}

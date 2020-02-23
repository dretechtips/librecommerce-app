import CostSchema from "../../billing/transaction/cost/Cost.schema";
import { Transactable } from "../../billing/transaction/Transaction.interface";
import Shipping from "./Shipping.model";

export interface ShippingDOT extends Transactable {
  provider: ShippingProvider;
  cancelled: boolean;
  days: number;
  packageIDs: string[];
}

export enum ShippingProvider {
  FEDEX,
  USPS,
  UPS,
  NONE
}

export interface ShippingProviderService {
  isAvailable(): Promise<boolean>;
  getCosts(obj: Shipping): Promise<CostSchema[]>;
}

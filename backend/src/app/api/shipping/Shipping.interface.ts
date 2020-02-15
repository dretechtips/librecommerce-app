import DimensionSchema from "src/app/common/model/schema/Dimension.schema";
import { Transactable } from "../billing/transaction/Transaction.interface";
import Shipping from "./Shipping.model";

export interface ShippingDOT {
  provider: ShippingProvider;
  cancelled: boolean;
  days: number;
  dimension: DimensionSchema;
  weight: number;
}

export enum ShippingProvider {
  FEDEX,
  USPS,
  UPS
}

export interface ShippingProviderService extends Transactable<Shipping> {
  isAvailable(): Promise<boolean>;
}

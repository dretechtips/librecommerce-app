import DimensionSchema from "src/app/common/model/schema/Dimension.schema";
import { Transactable } from "../billing/transaction/Transaction.interface";
import Shipping from "./Shipping.model";
import WeightSchema from "src/app/common/model/schema/Weight.schema";

export interface ShippingDOT {
  provider: ShippingProvider;
  cancelled: boolean;
  days: number;
  boxID: string;
  weight: WeightSchema;
}

export enum ShippingProvider {
  FEDEX,
  USPS,
  UPS,
  NONE
}

export interface ShippingProviderService extends Transactable<Shipping> {
  isAvailable(): Promise<boolean>;
}

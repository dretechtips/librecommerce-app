import * as Mongoose from "mongoose";

export interface ShippingCompileType {
  days: number;
  provider: string;
  cancelled: boolean;
}

export type ShippingProvider =
  | "usps"
  | "ups"
  | "fedex"
  | "FEDEX"
  | "UPS"
  | "USPS";

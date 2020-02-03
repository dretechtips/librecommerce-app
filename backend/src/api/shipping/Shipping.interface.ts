export interface ShippingDOT {
  provider: string;
  cancelled: boolean;
  days: number;
}

export type ShippingProvider =
  | "usps"
  | "ups"
  | "fedex"
  | "USPS"
  | "UPS"
  | "fedex";

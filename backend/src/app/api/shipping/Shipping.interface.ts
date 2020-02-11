export interface ShippingDOT {
  provider: ShippingProvider;
  cancelled: boolean;
  days: number;
}

export enum ShippingProvider {
  FEDEX,
  USPS,
  UPS
}

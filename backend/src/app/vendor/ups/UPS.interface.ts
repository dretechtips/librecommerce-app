import { ShippingDependentDOT } from "src/app/api/sale/shipping/Shipping.interface";

export interface UPSDOT extends ShippingDependentDOT {}

export interface UPSConfig {
  licenseID: string;
  userID: string;
  password: string;
}

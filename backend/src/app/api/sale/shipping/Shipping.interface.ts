import Account from "src/app/api/account/Account.model";
import AddressSchema from "src/app/common/model/schema/Address.schema";
import { CardDOT } from "../../billing/payments/card/Card.interface";
import CostSchema from "../../billing/transaction/cost/Cost.schema";
import { Transactable } from "../../billing/transaction/Transaction.interface";
import Company from "../../company/Company.model";
import { PackageDOT } from "./package/Package.interface";

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
  getCosts(packages: PackageDOT[], days: number): Promise<CostSchema[]>;
  cancel(shipingID: string): Promise<void>;
  create(
    days: number,
    packages: PackageDOT[],
    shipFromDOT: Account | Company,
    shipToDOT: Account | Company,
    card: CardDOT
  ): Promise<ShippingDOT>;
  return(
    shippingDOT: ShippingDOT,
    shipFromDOT: Account | Company,
    card: CardDOT
  ): Promise<ShippingDOT>;
  track(shippingID: string): Promise<AddressSchema>;
  addressValidation(address: AddressSchema): Promise<boolean>;
}

export interface ShippingDependentDOT {
  shippingID: string;
  /**
   * Vendor Shipping Identification
   */
  vShippingID: string;
  tracking: string;
}

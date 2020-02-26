import { AccountDOT } from "../../account/Account.interface";
import { CustomerDOT } from "../../account/type/customer/Customer.interface";
import CostSchema from "../../billing/transaction/cost/Cost.schema";
import { Transactable } from "../../billing/transaction/Transaction.interface";

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
  getCosts(obj: ShippingDOT): Promise<CostSchema[]>;
  cancel(shiping: ShippingDOT): Promise<void>;
  create(
    shipping: ShippingDOT,
    customer: CustomerDOT,
    accountDOT: AccountDOT
  ): Promise<void>;
}

export interface ShippingDependentDOT {
  shippingID: string;
  /**
   * Vendor Shipping Identification
   */
  vShippingID: string;
}

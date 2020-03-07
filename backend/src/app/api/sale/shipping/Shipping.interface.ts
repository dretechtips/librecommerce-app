import AddressSchema from "src/app/common/model/schema/Address.schema";
import ContactSchema from "src/app/common/model/schema/Contact.schema";
import CostSchema from "../../billing/transaction/cost/Cost.schema";
import { Transactable } from "../../billing/transaction/Transaction.interface";
import { PackageDOT } from "./package/Package.interface";

export interface ShippingDOT extends Transactable {
  provider: ShippingProvider;
  cancelled: boolean;
  days: number;
  packageIDs: string[];
  shipFrom: AddressSchema;
  shipTo: AddressSchema;
}

export interface ShippingParty {
  contact: ContactSchema;
  company?: string;
}

export enum ShippingProvider {
  // FEDEX,
  // USPS,
  UPS,
  NONE
}

/**
 * One - One Communication to different shipping API
 * `NOTE:` That this service will assume that all shipping are unilateral shippings, thus
 * shipper cannot be assigned to other company and all shipping fee will be put on this company.
 */
export interface ShippingProviderService {
  /**
   * Makes request to see if the server / microservice is alive and working.
   */
  isAvailable(): Promise<boolean>;
  /**
   * Gets the costs associated witht his shipping provider
   * @param packages Standard Package
   * @param days
   */
  getCosts(
    days: number,
    packages: PackageDOT[],
    shipFrom: ShippingParty,
    shipTo: ShippingParty
  ): Promise<CostSchema[]>;
  /**
   * Cancels vendor shipping
   * @param shipingID Database Shipping ID
   */
  cancel(shipingID: string): Promise<void>;
  /**
   * Sends the shipping to the address, from the store provide
   * @param days Package days in transit
   * @param packages Package details
   * @param store The store that the shipping module chooses to ship from
   * @param shipTo Details on where the package is going to
   */
  ship(
    days: number,
    packages: PackageDOT[],
    shipFrom: ShippingParty,
    shipTo: ShippingParty
  ): Promise<ShippingDOT>;
  /**
   * Returns the shipping back to the nearest facility
   * @param shipping ShippingDOT
   */
  return(
    packages: PackageDOT[],
    shipFrom: ShippingParty,
    shipTo: ShippingParty
  ): Promise<ShippingDOT>;
  /**
   * Gives the current location of where the shipping is located for reference
   * @param shipping ID
   */
  track(shippingID: string): Promise<AddressSchema>;
  /**
   * Checks if the location is valid for the vendor
   * @param address Location
   */
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

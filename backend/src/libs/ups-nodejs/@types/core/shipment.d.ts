declare module "ups_node" {
  /**
   * Barebone UPS Shipment
   */
  export interface Shipment {
    description: string;
    name: string;
    phoneNumber: string;
    shipperNumber: string;
    shipper: {
      attentionName: string;
      shipperNumber: string;
      phone: string;
      address: Address;
    };
    shipTo: Party;
    shipFrom: Party;
    package: Packages;
    schedule: Schedule;
    paymentInformation: Payment;
    service: Service;
    confirmation?: Confirmation;
    // TODO: Return Service
  }

  export type ShipmentRate = Omit<Shipment, "shipper"> & {
    shipper: {
      address: Pick<Address, "city" | "StateProvinceCode" | "countryCode"> & {
        PostalCode: string;
        addressLine: string;
      };
    };
  };

  /**
   * UPS Address For Rating
   */
  export interface Address {
    addressLine: string;
    city: string;
    StateProvinceCode: string;
    PostalCode: string;
    countryCode: string;
  }

  /**
   * UPS Address For Ship Confirm
   */
  export interface Address {
    address1: string;
    address2?: string;
    address3?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  }

  /**
   * UPS Shipping Party - Reciever and Sender
   */
  export interface Party {
    companyName: string;
    attentionName: string;
    phoneNumber: string;
    addressLine: string;
    city: string;
    stateProvinceCode: string;
    postalCode: string;
    countryCode: string;
  }

  /**
   * UPS Service
   */
  export interface Service {
    code: ServiceCode;
  }

  /**
   * UPS Service Code
   */
  export enum ServiceCode {
    NEXTDAY_AIR = "01",
    SECONDDAY_AIR = "02",
    GROUND = "03",
    EXPRESS = "07",
    EXPEDITED = "08",
    STANDARD = "11",
    THREEDAY = "12",
    NEXTDAY_AIR_SAVER = "13",
    NEXTDAY_AIR_EARLY_AM = "14",
    EXPRESS_PLUS = "54",
    SECONDDAY_AIR_AM = "59",
    SAVER = "65",
    FIRSTCLASSMAIL = "M2",
    PRIORITYMAIL = "M3",
    UPS_TODAY_STANDARD = "82",
    UPS_TODAY_DEDICATED = "83",
    UPS_TODAY_EXPRESS = "85",
    UPS_TODAY_EXPRESS_SAVE = "86",
    UPS_WORLDWIDE_EXPRESS_FRIGHT = "96"
  }

  /**
   * UPS Payment Method
   */
  export interface Payment {
    accountNumber: string;
  }

  /**
   * UPS Packages
   */
  export type Packages = Array<Package>;

  export interface Package {
    description: string;
    code: string;
    weight: number;
    insurance: Insurance;
  }

  // TODO
  export interface Insurance {}

  export interface Schedule {
    pickUpDay: string;
    method: string;
  }

  export interface Confirmation {
    type: string;
  }
}

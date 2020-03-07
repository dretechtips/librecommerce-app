declare module "ups_node" {
  /**
   * Barebone UPS Shipment
   */
  export interface Shipment {
    description: string;
    shipper: {
      name: string;
      attentionName: string;
      shipperNumber: string;
      phone: string;
      address: Address;
    };
    shipTo: Party;
    shipFrom: Party;
    package: Packages;
    paymentInformation: Payment;
    service: Service;
    confirmation?: Confirmation;
    schedule?: Schedule;
    return?: ReturnService;
  }

  /**
   * Required is the packages are going to be returned
   */

  export interface ReturnService {
    code: ReturnServiceCode;
  }

  /**
   * UPS Address For Rating
   */
  export type Address = {
    address1: string;
    address2?: string;
    address3?: string;
    city: string;
    // STATE CODE
    state: string;
    // ZIP CODE
    zip: string;
    // COUNTRY CODE
    country: string;
  };

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
   * UPS Return Service Code
   */
  export enum ReturnServiceCode {
    PRINT_AND_MAIL = "02",
    RETURN_1 = "03",
    RETURN_3 = "05",
    ELECTRONIC_RETURN_LABEL = "08",
    PRINT_RETURN_LABEL = "09",
    EXCHANGE_PRINT_RETURN = "10",
    PC_S1_A1 = "11",
    PC_S1_A2 = "12",
    PC_S1_A3 = "13",
    PC_S1_A4 = "14",
    PC_S1_A5 = "15",
    PC_S3_A1 = "16",
    PC_S3_A2 = "17",
    PC_S3_A3 = "18",
    PC_S3_A4 = "19",
    PC_S3_A5 = "20"
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

//
// ALL THE INTERFACES ARE UP TO STANDARD AS OF 02/25/2020
//

export interface Header {
  transID: string;
  transactionSrc: string;
  AccessLicenseNumber: string;
  Username: string;
  Password: string;
  // ['Authenttication Token']: string;
  // Authorization: string;
}

export interface Query {
  additionaladdressvalidation: string;
}

export interface Body {
  Shipment: Container;
}

export interface Container {
  Description: string;
  ReturnService: ReturnContainer;
  Shipper: Shipper;
  ShipTo: ShipTo;
  /** `REQUIRED`: Return Shipment or Different Pickup Location  */
  ShipFrom?: ShipFrom;
  PaymentInformation: Payment;
  PromotionalDiscountInformation?: PromoCode;
  DGSignatoryInfo?: undefined;
  ShipmentRatingOption?: undefined;
  MovementReferenceNumber?: undefined;
  ReferenceNumber?: undefined;
  Service: Service;
}

export interface ReturnContainer {
  Code: number;
}

export interface Party {
  Name: string;
  AttentionName: string;
  CompanyDisplayableName: string;
  TaxIdentificationNumber?: string;
  Phone: Phone;
  EMailAddress: string;
  Address: Address;
}

export interface Shipper extends Party {
  TaxIdentificationNumber: string;

  /** Shipper’s six digit alphanumeric account number.  */
  ShipperNumber: string;
}

export interface ShipTo extends Party {
  Address: ShipToAddress;
}

export interface ShipFrom extends Party {}

export interface Phone {
  Number: string;
  Extension: string;
}

export interface Address {
  AddressLine: string;
  city: string;
  /** TODO */
  StateProvinceCode: string;
  PostalCode: string;
  CountryCode: string;
}

export interface ShipToAddress extends Address {
  AlternateDelieveryAddress?: Address;
}

export interface Payment {
  ShipmentCharge: Charge;
  BillShipper: Bill;
}

export interface Charge {
  Type: ChargeType;
  BillShipper: Bill;
}

export enum ChargeType {
  Transportation = 1,
  DutiesAndTax,
  BrokerOfChoice
}

export interface Bill {
  AccountNumber: string;
  CreditCard: string;
}

export interface CreditCard {
  Type: CreditCardType;
  Number: number;
  /** `FORMAT`: MMYYYY  */
  ExpirationDate: string;
  SecurityCode: string;
  Address: Address;
}

export enum CreditCardType {
  AMERICAN_EXPRESS = 1,
  DISCOVER = 3,
  MASTERCARD = 4,
  VISA = 6
}

export interface PromoCode {
  PromoCode: string;
  PromoAliasCode: string;
}

export interface Service {
  Code: ServiceCode;
  InvoiceLineTotal: ServiceInvoice;
}

export enum ServiceCode {
  NEXTDAY_AIR = "01",
  SECONDDAY_AIR = "02",
  GROUND = "03",
  EXPRESS = "07",
  EXPEDITED = "08",
  STANDARD = "11",
  THREE_DAY = "12",
  NEXTDAY_AIR_SAVER = "13",
  NEXTDAY_AIR_EARLY = "14"
}

export interface ServiceInvoice {
  /** TODO */
  CurrencyCode: string;
}

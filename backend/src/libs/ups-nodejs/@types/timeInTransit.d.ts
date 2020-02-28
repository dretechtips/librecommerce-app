declare module "ups_node" {
  export class TimeInTransit extends Default {
    makeRequest(options: TimeInTransitOption, callback: (data: any) => void);
  }

  export class TimeInTransitOption {
    customerContext: string;
    transitFrom: TransitFrom;
    transitTo: TransitTo;
    shipmentWeight: ShipmentWeight;
    invoiceLineTotal: LineTotal;
  }

  export interface TransitFrom {
    fromDivision3: string;
    fromDivision2: string;
    fromDivision1: string;
    fromCountry: string;
    fromCountryCode: string;
  }

  export interface TransitTo {
    fromDivision3: string;
    fromDivision2: string;
    fromDivision1: string;
    toCountryCode: string;
    postCode: string;
    addressIndicator: string;
  }

  export interface ShipmentWeight {
    code: string;
    description: string;
    weight: number;
  }

  export interface LineTotal {
    currencyCode: string;
    monetaryValue: string;
    pickupDate: string;
  }
}

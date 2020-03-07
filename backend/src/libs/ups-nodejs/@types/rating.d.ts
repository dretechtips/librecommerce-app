import "ups_node";

declare module "ups_node" {
  export class Rating extends Default {
    makeRequest(options: RatingOptions, callback: (data: any) => void): void;
  }

  export interface RatingOptions {
    customerContext: string;
    pickUpType: PickupType;
    shipment: ShipmentRate;
  }

  export interface PickupType {
    code: string;
    description: string;
  }
}

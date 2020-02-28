import "ups_node";

declare module "ups_node" {
  export class VoidShipment extends Default {
    makeRequest(
      options: VoidShipmentOptions,
      callback: (data: any) => void
    ): void;
  }

  export interface VoidShipmentOptions {
    tracking: string;
  }
}

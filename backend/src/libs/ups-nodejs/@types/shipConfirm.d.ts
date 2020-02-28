declare module "ups_node" {
  export class ShipConfirm extends Default {
    makeRequest(options: ShipConfirmOptions, callback: (data: any) => void);
  }

  export interface ShipConfirmOptions {
    validate: string;
    shipment: Shipment;
  }
}

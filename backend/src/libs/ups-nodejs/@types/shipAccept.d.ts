declare module "ups_node" {
  export class ShipAccept extends Default {
    makeRequest(options: ShipAcceptOption, callback: (data: any) => void);
  }

  export class ShipAcceptOption {
    digest: string;
  }
}

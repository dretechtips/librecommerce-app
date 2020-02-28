declare module "ups_node" {
  export class Tracking extends Default {
    makeRequest(options: TrackingOptions, callback: (data: any) => void): void;
  }

  export interface TrackingOptions {
    customerContext: string;
    trackingNumber: string;
  }
}

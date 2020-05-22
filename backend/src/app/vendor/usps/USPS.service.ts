import { Injectable } from "@nestjs/common";
import CostSchema from "src/app/api/billing/cost/Cost.schema";
import { ShippingProviderService } from "src/app/api/sale/shipping/Shipping.interface";

@Injectable()
export class USPSService implements ShippingProviderService {
  public async isAvailable(): Promise<boolean> {
    return false;
  }
  public async getCosts(): Promise<CostSchema[]> {
    return [];
  }
}

export default USPSService;

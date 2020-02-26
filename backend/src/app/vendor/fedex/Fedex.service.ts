import { Injectable } from "@nestjs/common";
import CostSchema from "src/app/api/billing/transaction/cost/Cost.schema";
import { ShippingProviderService } from "src/app/api/sale/shipping/Shipping.interface";
import Shipping from "src/app/api/sale/shipping/Shipping.model";

@Injectable()
export class FedexService implements ShippingProviderService {
  public async isAvailable(): Promise<boolean> {
    return false;
  }
  public async getCosts(shipping: Shipping): Promise<CostSchema[]> {
    return [];
  }
}

export default FedexService;

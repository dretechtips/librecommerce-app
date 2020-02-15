import { Injectable } from "@nestjs/common";
import { ShippingProviderService } from "src/app/api/shipping/Shipping.interface";
import Shipping from "src/app/api/shipping/Shipping.model";
import { SubCost } from "src/app/api/billing/transaction/Transaction.interface";

@Injectable()
export class FedexService implements ShippingProviderService {
  public async isAvailable(): Promise<boolean> {
    return false;
  }
  public async getCosts(shipping: Shipping): Promise<SubCost[]> {
    return [];
  }
}

export default FedexService;

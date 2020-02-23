import { Injectable } from "@nestjs/common";
import { SubCost } from "src/app/api/billing/transaction/Transaction.interface";
import { ShippingProviderService } from "src/app/api/sale/shipping/Shipping.interface";
import Shipping from "src/app/api/sale/shipping/Shipping.model";

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

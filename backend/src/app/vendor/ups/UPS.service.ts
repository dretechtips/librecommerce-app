import { Injectable } from "@nestjs/common";
import Shipping from "src/app/api/shipping/Shipping.model";
import { ShippingProviderService } from "src/app/api/shipping/Shipping.interface";
import { SubCost } from "src/app/api/billing/transaction/Transaction.interface";

@Injectable()
export class UPSService implements ShippingProviderService {
  public async isAvailable(): Promise<boolean> {
    return false;
  }
  public async getCosts(shipping: Shipping): Promise<SubCost[]> {
    return [];
  }
}

export default UPSService;

import { Injectable } from "@nestjs/common";
import { ShippingProviderService } from "src/app/api/shipping/Shipping.interface";
import { SubCost } from "src/app/api/billing/transaction/Transaction.interface";

@Injectable()
export class USPSService implements ShippingProviderService {
  public async isAvailable(): Promise<boolean> {
    return false;
  }
  public async getCosts(): Promise<SubCost[]> {
    return [];
  }
}

export default USPSService;

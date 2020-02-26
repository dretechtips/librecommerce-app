import { Injectable } from "@nestjs/common";
import { AccountDOT } from "src/app/api/account/Account.interface";
import { CustomerDOT } from "src/app/api/account/type/customer/Customer.interface";
import CostSchema from "src/app/api/billing/transaction/cost/Cost.schema";
import {
  ShippingDOT,
  ShippingProviderService
} from "src/app/api/sale/shipping/Shipping.interface";

@Injectable()
export class UPSService implements ShippingProviderService {
  private version;
  private shippingURL: string;
  constructor() {
    /**
     * UPS LATEST VERSION as of 02/25/2020
     */
    this.version = "v1801";
    this.shippingURL = this.generateShippingURL();
  }
  private generateShippingURL() {
    return "https://onlinetools.ups.com/ship/" + this.version + "/shipments";
  }
  public async isAvailable(): Promise<boolean> {
    return false;
  }
  public async getCosts(shipping: ShippingDOT): Promise<CostSchema[]> {
    return [];
  }
  public async cancel(shipping: ShippingDOT): Promise<void> {}
  public async create(
    shipping: ShippingDOT,
    customer: CustomerDOT,
    account: AccountDOT
  ): Promise<void> {}
}

export default UPSService;

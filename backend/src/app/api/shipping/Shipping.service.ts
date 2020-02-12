import { Injectable, Scope } from "@nestjs/common";
import { ShippingDOT } from "./Shipping.interface";
import Service from "src/app/common/service/Service.factory";
import Shipping from "./Shipping.model";

@Injectable()
export class ShippingService extends Service<Shipping> {
  constructor() {
    super(Shipping);
  }
}

export default ShippingService;

import { Injectable } from "@nestjs/common";
import Shipping from "src/api/shipping/Shipping.model";
import { ShippingPartner } from "../Vendor.interface";

@Injectable()
export class UPSService implements ShippingPartner {
  public isShippingAvailible(shipping: Shipping): Promise<boolean> {}
}

export default UPSService;

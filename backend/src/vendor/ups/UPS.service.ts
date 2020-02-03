import { Injectable } from "@nestjs/common";
import Shipping from "src/api/shipping/Shipping.model";

@Injectable()
export class UPSService {
  public isShippingAvailible(shipping: Shipping) {}
}

export default UPSService;

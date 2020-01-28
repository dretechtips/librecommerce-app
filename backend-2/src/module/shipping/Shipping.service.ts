import { Injectable, Scope } from "@nestjs/common";
import { ShippingDOT } from "./Shipping.interface";
import { Form } from "src/interface/Form.interface";

@Injectable()
export class ShippingService {
  public readonly form: Form<ShippingDOT> = {
    title: "Shipping",
    questions: {
      days: {},
      provider: {},
      cancelled: {}
    }
  };
}

export default ShippingService;

import { Injectable, Scope } from "@nestjs/common";
import { ShippingDOT } from "src/model/Shipping";
import { Form } from "src/interface/Form.interface";

@Injectable({ scope: Scope.DEFAULT })
class ShippingService {
  public readonly form: Form<ShippingDOT> = {
    title: "Shipping",
    questions: {
      days: {},
      provider: {},
      cancelled: {}
    }
  };
}

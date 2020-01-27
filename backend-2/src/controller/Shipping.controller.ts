import { Controller, Post, Body, Patch, Get, Next } from "@nestjs/common";
import FormService from "src/service/Form.service";
import { ShippingDOT } from "src/interface/Shipping.interface";
import Shipping from "src/model/Shipping";
import {
  ShippingValidationPipe,
  ShippingIDValidationPipe
} from "src/pipe/Shipping.pipe";

export const prefix = "shipping";

@Controller(prefix)
class ShippingController {
  constructor(private readonly form: FormService) {}
  @Post("create")
  public create(
    @Body(prefix, ShippingValidationPipe) dot: ShippingDOT,
    @Next() next: Function
  ) {
    const shipping = new Shipping(dot);
    shipping.save();
    return next();
  }
  @Patch("update")
  public update(
    @Body(prefix, ShippingIDValidationPipe, ShippingValidationPipe)
    dot: ShippingDOT,
    @Next() next
  ) {
    const shipping = new Shipping(dot);
    shipping.update();
    return next();
  }
  @Get("detail")
  public detail(@Body(prefix, ShippingIDValidationPipe) dot: { id: string }) {
    const shipping = Shipping.getSelfByID(dot.id);
    if (!shipping) throw new Error("Invalid Shipping ID passed in.");
  }
}

export default ShippingController;

import { Controller, Post, Body, Patch, Get, Next } from "@nestjs/common";
import { ShippingDOT } from "./Shipping.interface";
import Shipping from "./Shipping.model";
import {
  ShippingValidationPipe,
  ShippingIDValidationPipe
} from "./Shipping.pipe";
import ShippingService from "./Shipping.service";

export const prefix = "shipping";

@Controller(prefix)
class ShippingController {
  constructor(private readonly shipping: ShippingService) {}
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
    shipping.update(dot);
    return next();
  }
  @Get("fetch/:id")
  public detail(@Body(prefix, ShippingIDValidationPipe) id: string) {
    return this.shipping.get(id).then(cur => cur.toJSON());
  }
}

export default ShippingController;

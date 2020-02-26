import { Body, Controller, Get } from "@nestjs/common";
import { ValidateShippingIDPipe } from "./Shipping.pipe";
import ShippingService from "./Shipping.service";

export const prefix = "shipping";

@Controller(prefix)
class ShippingController {
  constructor(private readonly shipping: ShippingService) {}
  @Get("fetch/:id")
  public detail(@Body(prefix, ValidateShippingIDPipe) id: string) {
    return this.shipping.get(id).then(cur => cur.toJSON());
  }
}

export default ShippingController;

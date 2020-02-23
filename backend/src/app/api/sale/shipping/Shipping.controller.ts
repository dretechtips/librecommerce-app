import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ShippingDOT } from "./Shipping.interface";
import { ValidateShippingIDPipe, ValidateShippingPipe } from "./Shipping.pipe";
import ShippingService from "./Shipping.service";

export const prefix = "shipping";

@Controller(prefix)
class ShippingController {
  constructor(private readonly shipping: ShippingService) {}
  @Post("create")
  public async create(@Body(prefix, ValidateShippingPipe) dot: ShippingDOT) {
    return (await this.shipping.add(dot)).toJSON();
  }
  @Patch("update/:shippingID")
  public update(
    @Body(prefix, ValidateShippingPipe)
    dot: ShippingDOT,
    @Param("shippingID", ValidateShippingIDPipe) shippingID: string
  ) {
    dot.cancelled = false;
    this.shipping.update(shippingID, dot);
  }
  @Get("fetch/:id")
  public detail(@Body(prefix, ValidateShippingIDPipe) id: string) {
    return this.shipping.get(id).then(cur => cur.toJSON());
  }
}

export default ShippingController;

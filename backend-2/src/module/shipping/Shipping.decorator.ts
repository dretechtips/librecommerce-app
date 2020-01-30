import { createParamDecorator, Body } from "@nestjs/common";
import { prefix } from "./Shipping.controller";
import { ShippingValidationPipe } from "./Shipping.pipe";

export const GetShippingFromBody = createParamDecorator((data, request) => {
  return Body(prefix, ShippingValidationPipe);
});

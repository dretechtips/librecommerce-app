import { createParamDecorator, Body } from "@nestjs/common";
import { prefix } from "./Cart.controller";
import { CartValidationPipe } from "./Cart.pipe";

export const GetCartFromBody = createParamDecorator((data, req) => {
  return Body(prefix, CartValidationPipe);
});

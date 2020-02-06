import { createParamDecorator, Body } from "@nestjs/common";
import { Request } from "express";
import { prefix } from "./Cart.controller";
import { CartValidationPipe } from "./Cart.pipe";

export const GetCartFromBody = createParamDecorator((data, req) => {
  return Body(prefix, CartValidationPipe);
});

export const GetCartIDFromCookie = createParamDecorator(
  (data: any, req: Request) => {
    return req.cookies[prefix];
  }
);

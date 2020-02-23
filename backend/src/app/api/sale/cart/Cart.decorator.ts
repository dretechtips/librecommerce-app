import { Body, createParamDecorator } from "@nestjs/common";
import { Request } from "express";
import { prefix } from "./Cart.controller";
import { ValidateCartPipe } from "./Cart.pipe";

export const GetCartFromBody = createParamDecorator((data, req) => {
  return Body(prefix, ValidateCartPipe);
});

export const GetCartIDFromCookie = createParamDecorator(
  (data: any, req: Request) => {
    return req.cookies[prefix];
  }
);

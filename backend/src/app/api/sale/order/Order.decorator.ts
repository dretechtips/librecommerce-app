import { Body, createParamDecorator } from "@nestjs/common";
import { Request } from "express";
import { prefix } from "./Order.controller";
import { ValidateOrderPipe } from "./Order.pipe";

/**
 * @returns OrderDOT
 */
export const GetOrderFromBody = createParamDecorator(
  (data: any, req: Request) => {
    return Body(prefix, ValidateOrderPipe);
  }
);

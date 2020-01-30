import { createParamDecorator, Body } from "@nestjs/common";
import { Request } from "express";
import { prefix } from "./Order.controller";
import { OrderValidationPipe } from "./Order.pipe";

/**
 * @returns OrderDOT
 */
export const GetOrderFromBody = createParamDecorator(
  (data: any, req: Request) => {
    return Body(prefix, OrderValidationPipe);
  }
);

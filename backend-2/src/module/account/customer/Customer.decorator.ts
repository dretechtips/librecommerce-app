import { Request } from "express";
import { createParamDecorator, Body } from "@nestjs/common";
import { prefix } from "./Customer.controller";
import { CustomerIDValidationPipe } from "./Customer.pipe";

export const ValidateCustomerIDFromBody = createParamDecorator(
  (data: any, req: Request) => {
    return Body(prefix, CustomerIDValidationPipe);
  }
);

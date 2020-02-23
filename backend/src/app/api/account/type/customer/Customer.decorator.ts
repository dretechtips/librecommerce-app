import { Body, createParamDecorator } from "@nestjs/common";
import { Request } from "express";
import { prefix } from "./Customer.controller";
import { CustomerIDValidationPipe } from "./Customer.pipe";

export const GetCustomerIDFromBody = createParamDecorator(
  (data: any, req: Request) => {
    return Body(prefix, CustomerIDValidationPipe);
  }
);

export const GetCustomerIDFromCookie = createParamDecorator(
  (data: any, req: Request) => {
    return req.cookies[prefix];
  }
);

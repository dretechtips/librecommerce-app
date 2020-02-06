import { Request } from "express";
import path from "path";
import { createParamDecorator, Body } from "@nestjs/common";
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

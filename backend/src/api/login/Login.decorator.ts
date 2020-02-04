import { createParamDecorator } from "@nestjs/common";
import { Request } from "express";
import { prefix } from "./Login.controller";

/**
 * @returns string
 */
export const GetLoginFromCookie = createParamDecorator(
  (data: any, req: Request) => {
    return req.cookies[prefix];
  }
);

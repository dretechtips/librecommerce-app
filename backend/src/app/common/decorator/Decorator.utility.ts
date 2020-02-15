import { createParamDecorator } from "@nestjs/common";
import { Request } from "express";

export const Cookie = createParamDecorator((data: string, req: Request) => {
  return req.cookies[data];
});

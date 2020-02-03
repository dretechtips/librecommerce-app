import { NestMiddleware, Injectable } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class CreateNewSaleMiddleware implements NestMiddleware {
  constructor() {}
  public use(req: Request, res: Response, next: Function) {
    return next();
  }
}
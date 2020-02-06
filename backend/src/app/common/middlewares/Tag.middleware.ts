import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import uuid from "uuid";

export class TagMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: Function) {
    res.cookie("uuid", uuid, {sameSite: true});
    return next();
  }
}
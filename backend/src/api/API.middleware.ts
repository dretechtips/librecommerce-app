import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { LoggerMiddleware } from "src/common/middlewares/Logger.middleware";

export class APILoggerMiddleware extends LoggerMiddleware {
  public use(req: Request, res: Response, next: Function) {
    this.setMessage("Accessing the API");
    super.use(req, res, next);
  }
}

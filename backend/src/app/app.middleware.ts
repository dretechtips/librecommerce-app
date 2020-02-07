import { LoggerMiddleware } from "./common/logger/Logger.middleware";
import { Request, Response } from "express";

export class AppLoggerMiddleware extends LoggerMiddleware {
  public use(req: Request, res: Response, next: Function) {
    this.setMessage("Request has entered.");
    super.use(req, res, next);
  }
}

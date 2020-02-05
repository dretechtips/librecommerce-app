import { NestMiddleware, Injectable } from "@nestjs/common";
import { Request, Response } from "express";

export class LoggerMiddleware implements NestMiddleware {
  private message: string = "";
  public use(req: Request, res: Response, next: Function) {
    console.log("[" + req.ip + "]: " + this.message);
    return next();
  }
  protected setMessage(s: string) {
    this.message = s;
  }
}

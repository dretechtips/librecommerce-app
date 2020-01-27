import { NestMiddleware, Injectable } from "@nestjs/common";
import { Request, Response } from "express";

export class LoggerMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: Function) {
    console.log("New connection with the IP Address of " + req.ip);
    return next();
  }
}

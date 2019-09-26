import { Request, Response, NextFunction } from "express";
import { HttpMethod } from "../decorator/HttpMethod";

export class ClientController {
  @HttpMethod("GET", "System was unable to fetch the client front end files.")
  public static getFrontend(req: Request, res: Response) {
    return;
  }
}
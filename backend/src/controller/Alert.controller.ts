import { Request, Response } from "express";
import { HttpMethod } from "../decorator/HttpMethod";

export class AlertController {
  @HttpMethod("POST", "System was unable to create a new alert.")
  public static add(req: Request, res: Response): void {
    
  }
  @HttpMethod("DELETE", "System was unable to delete an existing alert.")
  public static remove(req: Request, res: Response): void {

  }
  @HttpMethod("PATCH", "System was unable to update an existing alert.")
  public static update(req: Request, res: Response): void {

  }
  @HttpMethod("GET", "System was unable to list this users alerts.")
  public static list(req: Request, res: Response): void {

  }
}
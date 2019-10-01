import { Request, Response } from "express";
import { HttpMethod } from "../decorator/HttpMethod";

export class SubscriptionController {
  @HttpMethod("POST", "System was unable to add a subscription.")
  public static add(req: Request, res: Response) {
    
  }
  @HttpMethod("DELETE", "System was unable to delete a subscription.")
  public static remove(req: Request, res: Response) {

  }
  @HttpMethod("POST", "System was unable to update a subscription.")
  public static update(req: Request, res: Response) {

  }
  @HttpMethod("GET", "System was unable to list the subscriptions.")
  public static list(req: Request, res: Response) {

  }
}

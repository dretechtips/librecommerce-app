import { Request, Response } from "express-serve-static-core";
import { HttpMethod } from "../decorator/HttpMethod";

export class ScheduleController {
  @HttpMethod("POST")
  public static add(req: Request, res: Response): void {
    
  }
  @HttpMethod("DELETE")
  public static delete(req: Request, res: Response): void {
    
  }
  @HttpMethod("PATCH")
  public static update(req: Request, res: Response): void {

  }
}
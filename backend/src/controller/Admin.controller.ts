import { NextFunction, Request, Response } from "express";
import { IPAddress } from "../type/Location";

export class AdminController
{
  public static monitor(req: Request, res: Response, next: NextFunction) {
    try {
      const ip: IPAddress = new IPAddress(req.ip);
      hconsole.log(`An ADMIN with the IP address ${ip.toString()}
      has made an attempted change to the ${req.path}`);
      return next();
    }
    catch (e) {
      res.sendError(e, "System cannot log these changes");
    }
  }
  public static getAdminJS(req: Request, res: Response) {
    // Get the React file and download it
  }
}
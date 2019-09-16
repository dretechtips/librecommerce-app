import { Request, Response } from "express-serve-static-core";
import { Controller } from "./Controller";
import hconsole from "../model/Console";
import { Coupon } from "../model/Coupon";
import { HttpMethod } from "../decorator/HttpMethod";

export class CouponsController extends Controller
{
  @HttpMethod("POST")
  public static add( req: Request, res: Response)
  {
    const coupon: Coupon = Coupon.generate(req.body);
    coupon.save();
  }
  @HttpMethod("DELETE")
  public static delete(req: Request, res: Response)
  {
    const func: Function = new Function("apple", "pear", "kiil");
    func.arguments
  }
  public static update(req: Request, res: Response)
  {

  }
  
  public static search(req: Request, res: Response)
  {
    if(req.method === "POST")
    try {
      if (!req.query.startDate || !req.query.endDate) {
        res.send({ success: false, error: "Cannot search for coupon without a start and end date." });
        return;
      }
      
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: "System was unable to search for the coupon."});
    }
  }
}
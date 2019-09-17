import { Request, Response } from "express-serve-static-core";
import { Controller } from "./Controller";
import hconsole from "../model/Console";
import { Coupon } from "../model/Coupon";
import { HttpMethod } from "../decorator/HttpMethod";

export class CouponsController extends Controller
{
  @HttpMethod("POST")
  public static add( req: Request, res: Response): void
  {
    try {
      const coupon: Coupon = Coupon.generate(req.body);
      coupon.save();
      return;
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({ success: false, error: "System was unable to add the coupon." });
    }
  }
  @HttpMethod("DELETE")
  public static delete(req: Request, res: Response): void
  {
    try {
      const couponID: string = req.body.couponID;
      if (!couponID) {
        res.send({ success: false, error: "Client didn't pass in a coupon ID." });
        return;
      }
      const coupon: Coupon = Coupon.From.id(couponID);
      if (coupon === null) {
        res.send({ success: false, error: "Coupon ID doesn't exist in the system." });
      }
      coupon.delete();
      res.send({ success: true });
      return;
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({ success: false, error: "System was unable to delete the coupon" });
    }
  }
  @HttpMethod("PATCH")
  public static update(req: Request, res: Response): void
  {
    try {
      const couponID: string = req.body.couponID;
      if (!couponID) {
        res.send({ success: false, error: "Client didn't pass in a coupon ID." });
        return;
      }
      const coupon: Coupon = Coupon.From.id(couponID);
      if (!coupon) {
        res.send({ success: false, error: "Coupon with the the coupon ID inputted doesn't exist." });
        return;
      }
      coupon.update();
      return;
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({ success: false, error: "Systemw as unable to update the coupon." });
    }
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
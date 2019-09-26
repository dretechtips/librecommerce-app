import { Request, Response } from "express";
import { Coupon, CouponManager } from "../model/Coupon";
import { HttpMethod } from "../decorator/HttpMethod";
import { ClientError, ServerError } from "../model/Error";
import { CouponBody } from "../interface/Coupon.interface";

export class CouponsController
{
  @HttpMethod("POST", "System was unable to add the coupon.")
  public static add( req: Request, res: Response): void
  {
    const bCoupon: CouponBody = req.body.coupon;
    if(!bCoupon)
      throw new ClientError("Client didn't provide coupon details.");
    const coupon: Coupon = Coupon.generate(bCoupon);
    coupon.save();
    return;
  }
  @HttpMethod("DELETE", "System was unable to delete the coupon")
  public static delete(req: Request, res: Response): void
  {
    const couponID: string = req.body.couponID;
    if (!couponID) 
      throw new ClientError("Client didn't pass in a coupon ID.");
    const coupon: Coupon = CouponManager.from.id(couponID);
    if (!coupon) 
      throw new ClientError("Client passed in a coupon ID doesn't exist in the system.");
    coupon.delete();
    res.send({ success: true });
    return;
  }
  @HttpMethod("PATCH", "System was unable to update the coupon.")
  public static update(req: Request, res: Response): void
  {
    const couponID: string = req.body.coupon.id;
    if (!couponID) 
      throw new ClientError("Client didn't pass in a coupon ID.");
    const coupon: Coupon = CouponManager.from.id(couponID);
    if (!coupon) 
      throw new ClientError("Client passed in a coupon ID doesn't exist in the system.");
    coupon.update(req.body.coupon);
    coupon.save();
    return;
  }
  @HttpMethod("GET", "System was unable to search for the coupon")
  public static search(req: Request, res: Response)
  {
    if (!req.query.startDate || !req.query.endDate)
      throw new ClientError("Cannot search for coupon without a start and end date.");
  }
}
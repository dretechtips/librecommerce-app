import { Request, Response, NextFunction } from "express";
import { ShippingConstructor, NewShippingBody } from "../interface/Shipping.interface";
import { Shipping, ShippingManager, ShippingQueue } from "../model/Shipping";
import { HttpMethod } from "../decorator/HttpMethod";
import { ClientError } from "../model/Error";

export class ShippingController
{
  private static _queue: ShippingQueue = new ShippingQueue();
  @HttpMethod("POST", "System was unable to add the shipping.")
  public static add(req: Request, res: Response): void
  {
    const bShipping: NewShippingBody =  req.body.shipping;
    const shipping: Shipping = Shipping.generate(bShipping);
    shipping.save();
  }
  @HttpMethod("DELETE", "System was unable to delete the shipping.")
  public static cancel(req: Request, res: Response, next?: NextFunction): void {
    const shippingID: string = req.body.shipping.id;
    const shipping: Shipping[] = ShippingController._queue.getValues();
    for(let i = 0 ; i < shipping.length ; i++) {
      const cur: Shipping = shipping[i];
      if(cur.getID() === shippingID) 
        shipping.splice(i, 1);
    }
  }
  @HttpMethod("DELETE", "System was unable to delete order form the system.")
  public static delete(req: Request, res: Response, next?: NextFunction): void {
    ShippingController.cancel(req, res, next);
    const shippingID: string = req.body.shipping.id;
    const shipping: Shipping | null = ShippingManager.from.id(shippingID);
    if(!shipping)
      throw new ClientError("Client didn't provide a valid shipping ID.")
    shipping.delete();
  }
  @HttpMethod("PATCH", "System was unable to to update the shipping.")
  public static update(req: Request, res: Response) : void {
    const shippingID: string = req.body.shipping.id;
    const bShipping: any = req.body.shipping;
    const shipping: Shipping | null = ShippingManager.from.id(shippingID);
    if(!shipping)
      throw new ClientError("Client didn't provide a valid client id.");
    shipping.update(bShipping);
  }
  @HttpMethod("GET", "System was unable to get the shipping ID.")
  public static getShippingID(req: Request, res: Response): void {
    const shippingID: string = req.body.shipping.id;
    const shipping: Shipping | null = ShippingManager.from.id(shippingID);
    if(!shipping)
      throw new ClientError("Client didn't provide a valid shipping ID.");
    res.send({success: true, shipping: shipping.toPrimObj()});
  }
}
import { Request, Response, NextFunction } from "express";
import { Product, Inventory } from "../model/Inventory";
import { InventoryController } from "../controller/Inventory.controller";
import { HttpMethod } from "../decorator/HttpMethod";

export class LandingController
{
  @HttpMethod("GET", "System was unable to render the landing home page.")
  public static renderHome(req: Request, res: Response): void
  {
    res.render('./landing/home');
  }
  @HttpMethod("GET", "System was unable to render the landing shopping page.")
  public static renderShop(req: Request, res: Response, next: NextFunction): void
  {
    const products: Product[] | void = InventoryController.list(req, res, next);
    if(products)
      res.render('./landing/shop', {  products: products.map(cur => cur.toPrimitiveObj())  });
  }
  @HttpMethod("GET", "System was unable to render the landing content page.")
  public static renderContract(req: Request, res: Response): void
  {
    res.render('./landing/contact');
  }
}
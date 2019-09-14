import { Request, Response } from "express-serve-static-core";
import uuid = require('uuid/v4');
import hconsole from "../model/Console";
import { CartSession, Cart } from "../model/Cart";
import { Product } from "../model/Inventory";
import { Controller } from "./Controller";
import { OrdersController } from "./Orders.controller";
import { ProductConstructor, ExistingProductBody } from "../interface/Inventory.interface";

export class CartController extends Controller
{
  private static session = new CartSession();
  private static create(req: Request, res: Response): Response
  {
    const cart: Cart = Cart.generate(req.body);
    this.session.add(cart);
    return res.cookie('cartID', cart.getValue().id);
  }
  public static verify(req: Request, res: Response): void
  {
    try {
      if(!req.cookies.cartID)
      {
        const cart: Response = CartController.create(req, res);
        res.send({success: true});
      }
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: "System was unable to create a cart."});
    }
  }
  public static checkout(req: Request, res: Response): void
  {
    try {
      this.session.remove(req.cookies.cartID);
      res.clearCookie('cartID');
      OrdersController.add(req, res); 
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: "System was unable to checkout your order"});
    }
  }
  public static listItems(req: Request, res: Response): void
  {
    try {
      const cartID: string = req.cookies.cartID;
      if(!cartID) throw new Error("Unable to find the cart ID in the cookies.");
      const cart = this.session.find(cartID);
      const products: Product[] = cart.getValue().items;
      const productBody: ExistingProductBody[] = products.map(cur => cur.toPrimitiveObj());
      res.send({success: true, products: productBody});
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: });
    }
  }
  public static search(req: Request, res: Response): void
  {
    try {
      
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: ""});
    }
  }
}
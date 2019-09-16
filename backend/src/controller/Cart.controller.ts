import { Request, Response, NextFunction } from "express-serve-static-core";
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
  public static verify(req: Request, res: Response, next: NextFunction): void
  {
    try {
      if (!req.cookies.cartID) {
        const cart: Response = CartController.create(req, res);
        return next();
      }
      else {
        const cart: Cart = this.session.find(req.cookies.cartID);
        if (!cart) {
          const cart: Response = CartController.create(req, res);
          return next();
        }
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
      return;
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
      if (!cartID) {
        res.send({ success: false, error: "Unable to find the cart ID in the cookies." });
        return;
      }
      const cart = this.session.find(cartID);
      if (!cart) {
        res.send({ success: false, error: "Unable to find the cart from the cart ID." });
        return;
      }
      const products: Product[] = cart.getValue().items;
      const productBody: ExistingProductBody[] = products.map(cur => cur.toPrimitiveObj());
      res.send({ success: true, products: productBody });
      return;
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: "System was unable to list the items in the cart."});
    }
  }
  public static search(req: Request, res: Response): void
  {
    try {
      const carts: Cart[] = this.session.findAll();
      res.send({success: true, carts: carts});
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: "System was unable to find any cart at all."});
    }
  }
}
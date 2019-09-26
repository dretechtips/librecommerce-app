import { Request, Response, NextFunction } from "express-serve-static-core";
import { CartSession, Cart } from "../model/Cart";
import { Product } from "../model/Inventory";
import { OrdersController } from "./Orders.controller";
import { ExistingProductBody } from "../interface/Inventory.interface";
import { HttpMethod } from "../decorator/HttpMethod";
import { ClientError, ServerError } from "../model/Error";
import { ExistingCartBody } from "../interface/Cart.interface";

export class CartController
{
  private static _session = new CartSession();
  @HttpMethod("POST", "System was unable to create a cart.")
  private static create(req: Request, res: Response): Response
  {
    const cart: Cart = Cart.generate(req.body);
    this._session.add(cart);
    return res.cookie('cartID', cart.getID());
  }
  @HttpMethod("ALL", "System was unable to verify the cart session.")
  public static verify(req: Request, res: Response, next: NextFunction): void
  {
    if (!req.cookies.cartID) {
      req.method = "POST";
      res = CartController.create(req, res);
      return next();
    }
    else {
      const cart: Cart = this._session.find(req.cookies.cartID);
      if (!cart) {
        res = CartController.create(req, res);
        return next();
      }
    }
  }
  @HttpMethod("POST", "System was unable to checkout your order")
  public static checkout(req: Request, res: Response): void
  {
    this._session.remove(req.cookies.cartID);
    res.clearCookie('cartID');
    OrdersController.add(req, res);
    return;
  }
  @HttpMethod("GET", "System was unable to list the items in the cart.")
  public static listItems(req: Request, res: Response): void
  {
    const cartID: string = req.cookies.cartID;
    if (!cartID)
      throw new ClientError("Unable to find the cart ID in the cookies.");
    const cart = this._session.find(cartID);
    if (!cart)
      throw new ServerError("Unable to find the cart from the cart ID.");
    const products: Product[] = cart.getProducts();
    const productBody: ExistingProductBody[] = products.map(cur => cur.toPrimitiveObj());
    res.send({ success: true, products: productBody });
    return;
  }
  @HttpMethod("GET", "System was unable to find any cart at all.")
  public static search(req: Request, res: Response): void
  {
    const carts: Cart[] = this._session.getAll();
    const cartsBody: ExistingCartBody[] = carts.map(cur => cur.toPrimObj());
    res.send({success: true, carts: cartsBody});
  }
}
import { Request, Response, NextFunction } from "express-serve-static-core";
import uuid = require('uuid/v4');
import hconsole from "../model/Console";
import { CartSession, Cart } from "../model/Cart";
import { Product } from "../model/Inventory";
import { Controller } from "./Controller";
import { Action } from "../interface/Dashboard.interface";
import { OrdersController } from "./Orders.controller";
import pug = require('pug');

export class CartController extends Controller
{
  protected static _dashboardActions: Action[] = [
    {name: "Search", path: "/admin/search", icon: "fas fa-search"},
  ]
  protected static _childViewDir = "/cart";
  private static session = new CartSession();
  public static add(req: Request, res: Response)
  {
    const product: Product = Product.From.id(req.body.productID);
    const cart: Cart = this.session.find(req.cookies.cartID);
    cart.getValue().items.push(product);
    this.session.update(cart.getValue().id, cart);
  }
  private static create(req: Request, res: Response)
  {
    const cart: Cart = Cart.generate(req.body);
    this.session.add(cart);
    res.cookie('cartID', cart.getValue().id).send();
  }
  public static verify(req: Request, res: Response, next: NextFunction)
  {
    try {
    if(!req.cookies.cartID)
      CartController.create(req, res);
    next();
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public static checkout(req: Request, res: Response)
  {
    this.session.remove(req.cookies.cartID);
    res.clearCookie('cartID');
    OrdersController.add(req, res);
  }
  public static renderCheckout(req: Request, res: Response)
  {
    CartController.init();
    const page = pug.renderFile(this._adminViewDir + this._childViewDir + '/checkout.pug', {
      cart: this.session.find(req.cookies.cartID),
    })
  }
}
import { Controller } from "./Controller";
import { Actions } from "../interface/Dashboard.interface";
import * as pug from "pug";
import { Request, Response } from "express-serve-static-core";
import { ShippingConstructor, NewShippingBody } from "../interface/Shipping.interface";
import { OrderConstructor } from "../interface/Order.interface";
import { Money } from "../model/Money";
import { Shipping } from "../model/Shipping";
const viewDir = "./admin/view";
const shippingViewDir = viewDir + '/shipping';

export class ShippingController extends Controller
{
  protected static _dashboardActions: Actions[];
  public static renderDashboard(req: Request, res: Response)
  {
    const page = pug.renderFile(viewDir + "/layouts/actions.pug",
    {
      actions: this._dashboardActions
    });
    res.send(page);
  };
  public static renderSearch(req: Request, res: Response)
  {
    
  }
  public static add(req: Request, res: Response)
  {
    
  }
  public static addFromOrder(order: OrderConstructor, body: NewShippingBody)
  {
    const shipping = this.generate(order, body);
    Shipping.add(shipping);
  }
  private static generate(order: OrderConstructor, body: NewShippingBody): ShippingConstructor
  {
    const shipping: ShippingConstructor = 
    {
      orderID: order.id,
      days: body.days,
      price: new Money(body.price),
      provider: body.provider,
      cancelled: false,
    }
    return shipping;
  }
}
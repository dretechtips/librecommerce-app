import { Request, Response } from "express-serve-static-core";
import * as pug from "pug";
import { Controller } from "./Controller";
import { Action } from "../interface/Dashboard.interface";
import { OrdersQueue, Order } from "../model/Order";
import { Customer } from "../model/Customer";
import uuid = require("uuid/v4");
import { EmailAddress, PhoneNum } from "../type/Location";
import { Money } from "../type/Money";
import { FieldDef, QueryResult } from "pg";
import hconsole from "../model/Console";
import { Paypal } from "../model/Paypal";
import { Shipping } from "../model/Shipping";
const viewDir = "./admin/view";
const orderDir = "./admin/view/orders";

export class OrdersController extends Controller
{
  private static unprocessed: OrdersQueue = new OrdersQueue([]);
  protected static _dashboardActions: Action[] = 
  [{name: "Current List", path: "/admin/orders/list", icon: "fas fa-list"}
  {name: "Search", path: "/admin/orders/search", icon: "fas fa-search"},
  {name: "Add", path: "/admin/orders/add", icon: "fas fa-plus"},
  {name: "Remove", path: "/admin/orders/remove", icon: "fas fa-minus"},
  {name: "Refund", path: "/admin/orders/refund", icon: "fas fa-money-bill"}];
  public static renderDashboard(req: Request, res: Response): void
  {
    const page = pug.renderFile(viewDir + '/layouts/actions.pug', {
      actions: this._dashboardActions
    });
    res.send(page);
  }
  public static renderSearch(req: Request, res: Response): void
  {
    const page = pug.renderFile(orderDir + '/search.pug');
    res.send(page);
  }
  public static renderAdd(req: Request, res: Response): void
  {
    if(!req.query.customers)
    {
      const page = pug.renderFile(orderDir + '/add.pug');
      res.send(page);
    }
    else
    {
      const customers = req.query.customers;
      const page = pug.renderFile(orderDir + '/add.pug', 
      {
        customers
      });
      res.send(page);
    }
  }
  public static async add(req: Request, res: Response): Promise<void>
  {
    const order: Order = Order.generate(req.body, req);
    const shipping: Shipping = order.getShipping();
    this.unprocessed.enqueue(order);
  }
  public static async complete(req: Request, res: Response)
  {
    if(req.body.orderID === this.unprocessed.getNext().getValue().id)
    {
      const order = this.unprocessed.dequeue();
      const shipping = order.getShipping();
      order.save();
      shipping.save();
      res.send({success: true});
    }
    else
    {
      res.send({success: false, error: "Order ID must be the next order in queue"});
    }
  }
  public static hold(req: Request, res: Response)
  {
    if(req.body.orderID === this.unprocessed.getNext().getValue().id)
    {
      this.unprocessed.hold();
      res.send({success: true});
    }
    else res.send({success: false, error: "Order ID must be be an existing order ID in holding cell"});
  }
  public static async unhold(req: Request, res: Response)
  {
    const result = this.unprocessed.unhold(req.body.orderID);
    if(!result)
      res.send({success: false, error: "Order ID must be present within the holding cell"});
    else
      res.send({success: true});
  }
  public static remove(req: Request, res: Response): void
  {
    const order: Order = Order.From.id(req.body.id);
    order.delete();
  }
  public static update(req: Request, res: Response): void
  {
    const order: Order = Order.From.id(req.body.id);
    order.update(req.body);
  }
}
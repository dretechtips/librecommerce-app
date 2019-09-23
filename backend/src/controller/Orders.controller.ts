import { Request, Response } from "express-serve-static-core";
import { Controller } from "./Controller";
import { OrdersQueue, Order } from "../model/Order";
import { Customer } from "../model/Customer";
import uuid = require("uuid/v4");
import { EmailAddress, PhoneNum } from "../type/Location";
import { Money } from "../type/Money";
import { FieldDef, QueryResult } from "pg";
import { Paypal } from "../model/Paypal";
import { Shipping } from "../model/Shipping";
import { wsServer } from "../index";
import { OrderConstructor, ExistingOrderBody } from "../interface/Order.interface";

export class OrdersController extends Controller
{
  private static unprocessed: OrdersQueue = new OrdersQueue([]);
  public static async add(req: Request, res: Response): Promise<void>
  {
    try {
      const order: Order = Order.generate(req.body, req);
      this.unprocessed.enqueue(order);
      ws.emit(, order.toPrimObj());
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: "Unable to add order into the system."});
    }
  }
  public static async complete(req: Request, res: Response): Promise<void>
  {
    try {
      if(req.body.orderID !== this.unprocessed.getNextOrderID())
        throw new Error("Order ID wasn't next in the queue.");
      const order = this.unprocessed.dequeue();
      const shipping = order.getShipping();
      order.save();
      shipping.save();
      res.send({success: true});
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: "Unable to complete the next order!"});
    }
  }
  public static hold(req: Request, res: Response): void
  {
    try {
      if(req.body.orderID === this.unprocessed.getNextOrderID())
        throw new Error("The order id isn't next in the queue");
      this.unprocessed.hold();
      res.send({success: true});
    } catch (e) {
      const ex: Error = e;
      res.send({success: false, error: "Order ID must be be an existing order ID in holding cell"});
    }
  }
  public static unhold(req: Request, res: Response): void
  {
    try {
      const result = this.unprocessed.unhold(req.body.orderID);
      if(!result)
        throw new Error("Order ID must be present within the holding cell");
      else
        res.send({success: true});
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: ex.message});
    }
  }
  public static remove(req: Request, res: Response): void
  {
    try {
      const order: Order = Order.From.id(req.body.id);
      order.delete();
      res.send({success: true});
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: "System was unable to delete the order."});
    }
  }
  public static update(req: Request, res: Response): void
  {
    try {
      const order: Order = Order.From.id(req.body.id);
      order.update(req.body);
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: true, error: "System was unable to update order"})
    }
  }
  public static search(req: Request, res: Response): void
  {
    try {
      const orders: Order[] = Order.From.body(req.body);
      const orderResp = orders.map(cur => );
      res.send({success: true, orders: orders});
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: "System was unable to find the order."});
    }
  }
  public static getHoldList(req: Request, res: Response): void
  {
    try {
      const orders: Order[] = this.unprocessed.getHoldList();
      res.send({success: true, orders: orders});
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      res.send({success: false, error: "System was unable to get the hold list!"})
    }
  }
  public static feed(req: Request, res: Response)
  {
    ws.on("connection", wss =>
    {
      wss.on("message", message =>
      {
        try {
          const msg = message;
          wss.send(msg);
        } catch (e) {
          const ex: Error = e;
          hconsole.error(ex);
        }
      });
    })
  }
}
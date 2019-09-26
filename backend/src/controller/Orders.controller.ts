import { Request, Response } from "express";
import { OrderQueue, Order } from "../model/Order";
import { Customer } from "../model/Customer";
import uuid = require("uuid/v4");
import { EmailAddress, PhoneNum } from "../type/Location";
import { Money } from "../type/Money";
import { FieldDef, QueryResult } from "pg";
import { PaypalSetup, Paypal } from "../model/Paypal";
import { Shipping } from "../model/Shipping";
import { wsServer } from "../index";
import { OrderConstructor, ExistingOrderBody } from "../interface/Order.interface";
import { OrderEvent } from "../event/Order.event";

export class OrdersController
{
  private static _orderLeft: OrderQueue = new OrderQueue();
  private static _events: OrderEvent = new OrderEvent();
  public static add(req: Request, res: Response): void
  {
    try {
      const order: Order = Order.generate(req.body.order, req);
      this._orderLeft.enqueue(order);
      this._events.add(order);
      order.save();
      res.send({ success: true });
    } catch (e) {
      res.sendError(e, "System was unable to add the order.");
    }
  }
  public static complete(req: Request, res: Response): void
  {
    try {
      if(req.body.order.id !== this._orderLeft.getNextOrderID())
        throw new Error("System cannot get an order that isn't next in the queue.");
      const order: Order = this._orderLeft.dequeue();
      const shipping: Shipping = order.getShipping();
      order.complete();
      shipping.complete();
      order.save();
      shipping.save();
      res.send({success: true});
    } catch (e) {
      res.sendError(e, "System was unable to complete the next order!");
    }
  }
  public static hold(req: Request, res: Response): void
  {
    try {
      if(req.body.orderID === this._orderLeft.getNextOrderID())
        throw new Error("The order id isn't next in the queue");
      this._orderLeft.hold();
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
      if (!req.body.order.id)
        throw new Error("Client didn't provide an order id to remove.");
      const order: Order = Order.From.id(req.body.order.id);
      const orderID: string = order.getID();
      const orders: Order[] = this._orderLeft.getAllOrders();
      for (let i = 0; i < orders.length; i++) {
        const cur: Order = orders[i];
        if (cur.getID() === orderID) {
          orders.splice(i, 1);
          break;
        }
        if (i === orders.length)
          throw new Error("System couldn't find the order the unprocessed order.");
      }
      order.delete();
      res.send({success: true});
    } catch (e) {
      res.sendError(e, "System was unable to remove the order.");
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
    wsServer.once("connection", client => {
      this._events.on(this._events.getAdd(), (order: Order) => {
        client.send(order.toPrimObj());
      });
    });
  }
}
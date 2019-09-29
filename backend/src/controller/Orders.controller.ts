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
import { IOrder } from "../interface/Order.interface";
import { OrderEvent } from "../event/Order.event";
import { HttpMethod } from "../decorator/HttpMethod";

export class OrdersController
{
  private static _queue: OrderQueue = new OrderQueue();
  private static _events: OrderEvent = new OrderEvent();
  @HttpMethod("POST", "System was unable to add the order." )
  public static add(req: Request, res: Response): void
  {
    const bOrder: 
    const order: Order = Order.generate(req.body.order, req);
    this._queue.enqueue(order);
    this._events.add(order);
    order.save();
  }
  @HttpMethod("PATCH", "System was unable to complete the next order!")
  public static complete(req: Request, res: Response): void
  {
    if (req.body.order.id !== this._queue.getNextOrderID())
      throw new Error("System cannot get an order that isn't next in the queue.");
    const order: Order = this._queue.dequeue();
    const shipping: Shipping = order.getShipping();
    order.complete();
    shipping.complete();
    order.save();
    shipping.save();
    res.send({success: true});
  }
  @HttpMethod("PATCH", "Order ID must be be an existing order ID in holding cell")
  public static hold(req: Request, res: Response): void
  {
    if (req.body.orderID === this._queue.getNextOrderID())
      throw new Error("The order id isn't next in the queue");
    this._queue.hold();
  }
  @HttpMethod("PATCH", "System was unable to unhold the order.")
  public static unhold(req: Request, res: Response): void
  {
    const result = this._queue.unhold(req.body.orderID);
    if(!result)
      throw new Error("Order ID must be present within the holding cell");
  }
  @HttpMethod("DELETE", "System was unable to remove the order.")
  public static remove(req: Request, res: Response): void
  {
    if (!req.body.order.id)
      throw new Error("Client didn't provide an order id to remove.");
    const order: Order = Order.From.id(req.body.order.id);
    const orderID: string = order.getID();
    const orders: Order[] = this._queue.getAllOrders();
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
  }
  @HttpMethod("PATCH", "System was unable to update order")
  public static update(req: Request, res: Response): void
  {
    const orderID: string = req.body.order.id;
    const order: Order = Order.From.id(orderID);
    order.update(req.body);
  }
  @HttpMethod("GET", "System was unable to search for the orders.")
  public static search(req: Request, res: Response): void
  {
    const orders: Order[] = Order.From.body(req.body);
    const orderResp = orders.map(cur => );
    res.send({success: true, orders: orders});
  }
  @HttpMethod("GET", "System was unable to get the hold list!" )
  public static getHoldList(req: Request, res: Response): void
  {
    const orders: Order[] = this._queue.getHoldList();
    res.send({success: true, orders: orders});
  }
  @HttpMethod("GET", "System was unable to get the order feed.")
  public static feed(req: Request, res: Response)
  {
    wsServer.once("connection", client => {
      this._events.on(this._events.getAdd(), (order: Order) => {
        client.send(order.toPrimObj());
      });
    });
  }
}
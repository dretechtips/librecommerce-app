import { Request, Response } from 'express';
import Order from '../model/Order';
import OrderQueue from '../model/OrderQueue';
import { Customer } from '../model/Customer';
import uuid = require('uuid/v4');
import { EmailAddress, PhoneNum } from '../type/Location';
import { Money } from '../type/Money';
import { PaypalSetup, Paypal } from '../model/Paypal';
import { Shipping } from '../model/Shipping';
import { wsServer } from '../index';
import { IOrder, ExistingBody } from '../interface/Order.interface';
import { HttpMethod, HttpFunction } from '../decorator/HttpMethod';
import OrderFeed from '../model/OrderFeed';

const queue: OrderQueue = new OrderQueue();

const feeds: OrderFeed = new OrderFeed();

export const add = HttpFunction(
  'POST',
  'System was unable to add the order.',
  (req, res) => {
    const bOrder: IOrder.NewBody = req.body.order;
    const order: Order = Order.generate(bOrder, req);
    queue.enqueue(order);
    feeds.add(order);
    order.save();
  }
);

export const remove = HttpFunction(
  'DELETE',
  'System was unable to remove the order.',
  (req, res) => {
    const { id } = req.body.order as Pick<ExistingBody, 'id'>;
    const orders: Order[] = Order.search({ id });
    const order: Order = orders[0];
    for (let i = 0; i < orders.length; i++) {
      const cur: Order = orders[i];
      if (cur.getID() === orderID) {
        orders.splice(i, 1);
        break;
      }
      if (i === orders.length)
        throw new Error(
          "System couldn't find the order the unprocessed order."
        );
    }
    order.delete();
  }
);

export const update = HttpFunction(
  'PATCH',
  'System was unable to update order',
  (req, res) => {
    const orderID: string = req.body.order.id;
    const order: Order = Order.From.id(orderID);
    order.update(req.body);
  }
);

export const search = HttpFunction(
  'GET',
  'System was unable to search for the orders.',
  (req, res) => {
    const orders: Order[] = Order.From.body(req.body);
    const orderResp = orders.map();
    res.send({ success: true, orders: orders });
  }
);

export const hold = HttpFunction(
  'PATCH',
  'Order ID must be be an existing order ID in holding cell',
  (req, res) => {
    if (req.body.orderID === queue.getNextOrderID())
      throw new Error("The order id isn't next in the queue");
    queue.hold();
  }
);

export const unhold = HttpFunction(
  'PATCH',
  'System was unable to unhold the order.',
  (req, res) => {
    const result = queue.unhold(req.body.orderID);
    if (!result)
      throw new Error('Order ID must be present within the holding cell');
  }
);

export const searchHolds = HttpFunction(
  'GET',
  'System was unable to retrieve the holds!',
  (req, res) => {
    const orders: Order[] = queue.getHoldList();
    res.send({ success: true, orders: orders });
  }
);

export const complete = HttpFunction(
  'PATCH',
  'System was unable to complete the next order!',
  (req, res) => {
    if (req.body.order.id !== queue.getNextOrderID())
      throw new Error(
        "System cannot get an order that isn't next in the queue."
      );
    const order: Order = queue.dequeue();
    const shipping: Shipping = order.getShipping();
    order.complete();
    shipping.complete();
    order.save();
    shipping.save();
    res.send({ success: true });
  }
);

export const feed = HttpFunction(
  'GET',
  'System was unable to get the order feed.',
  (req, res) => {
    feeds.subscribe(wsServer);
  }
);

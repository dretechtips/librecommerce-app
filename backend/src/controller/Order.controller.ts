import { Request, Response } from "express";
import * as Mongoose from "mongoose";
import { wsServer } from "../index";
import { HttpMethod, HttpFunction } from "../decorator/Http.decorator";
import * as CustomerController from "./Customer.controller";
import * as CartController from "./Cart.controller";
import * as ShippingController from "./Shipping.controller";
import Controller from "../factory/Controller";
import Order from "../model/Order";

export const controller = new Controller("order", Order);

/**
 * Create a new order for the client
 */
export const Create = controller.create();

export const Delete = controller.delete();

export const Validate = controller.validateID();

export const hold = [
  get,
  HttpFunction(
    "Order ID must be be an existing order ID in holding cell",
    (req, res, next) => {
      req.order.hold();
      return next();
    }
  )
];

export const unhold = [
  get,
  HttpFunction("System was unable to unhold the order.", (req, res, next) => {
    if (req.order.isHeld()) req.order.unhold();
    else
      throw new ClientError(
        "Client cannot unhold an order that was never held."
      );
    return next();
  })
];

export const getHoldList = HttpFunction(
  "System was unable to retrieve the holds!",
  async (req, res, next) => {
    const orderIDs: string[] = await Order.search({ hold: true });
    res.send({ success: true, orders: orders });
  }
);

export const complete = [
  get,
  HttpFunction(
    "System was unable to complete the next order!",
    (req, res, next) => {
      const shipping: Shipping = req.order.getShipping();
      req.order.complete();
      shipping.complete();
      req.order.save();
      shipping.save();
      return next();
    }
  )
];

export const feed = HttpFunction(
  "System was unable to get the order feed.",
  (req, res, next) => {
    feeds.subscribe(wsServer);
    return next();
  }
);

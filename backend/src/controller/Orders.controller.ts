import { Request, Response } from "express";
import * as Mongoose from "mongoose";
import { NewOrder } from "../model/Order";
import { NewOrderData } from "../interface/Order.interface";
import OrderQueue from "../model/OrderQueue";
import * as uuid from "uuid/v4";
import { wsServer } from "../index";
import { HttpMethod, HttpFunction } from "../decorator/Http.decorator";
import OrderFeed from "../model/OrderFeed";
import { ServerError, ClientError } from "../type/Error";
import * as CustomerController from "./Customer.controller";
import * as CartController from "./Cart.controller";
import * as ShippingController from "./Shipping.controller";
import * as Controller from "../factory/Controller";
import { PersistantData } from "../interface/Model.interface";

const feeds: OrderFeed = new OrderFeed();
//const queue: OrderQueue = new OrderQueue();

export const Create = [
  /** Validates Data */
  HttpFunction("Client failed to provide an order data", (req, res, next) => {
    const order = new NewOrder(req.body.order);
    order.validate(err => {
      if (err)
        throw new ClientError("Client failed to provide a correct order data");
      return next();
    });
  }),
  // Verify the CustomerID
  HttpFunction("System was unable to find customer ID", (req, res, next) => {
    const customerID = (req.body.order as typeof NewOrderData).customerID;
    if (customerID && typeof customerID === "string") {
      res.locals.customer = { id: customerID };
      return next();
    }
    throw new ClientError(
      "System was unable to find customer ID in the request order body."
    );
  }),
  CustomerController.VerifyCustomerIDFromLocals,
  // Get Cart Items
  CartController.GetCart,
  // Create Shipping
  HttpFunction("System was unable to create a shipping", (req, res, next) => {
    res.locals.shipping = (req.body.order as typeof NewOrderData).shipping;
    return next();
  }),
  ShippingController.Add
  // Add Order Data into database
];

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

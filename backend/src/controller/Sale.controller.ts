import { RequestHandler } from "express";
import { HttpFunction } from "../decorator/Http.decorator";
import * as TransactionController from "./Transaction.controller";
import * as OrderController from "./Order.controller";
import * as ShippingController from "./Shipping.controller";
import * as CartController from "./Cart.controller";
import * as CustomerController from "./Customer.controller";
import Customer from "../model/Customer";
import Cart from "../model/Cart";
import Shipping from "../model/Shipping";
import { SaleCompileType } from "../interface/Sale.interface";
import { Sale } from "../model/Sale";

/**
 * Creates a cart, shipping, and order and returns a transaction to fill out by the client
 * @param type User Type
 */
export const Create = function(type: "admin" | "client"): RequestHandler[] {
  return [
    CartController.Create(),
    ShippingController.Create(),
    OrderController.Create(),
    TransactionController.Create(
      [
        { model: Cart, controller: CartController.controller },
        { model: Shipping, controller: ShippingController.controller }
      ],
      "sales"
    ),
    CustomerController.Get(type),
    Capture(),
    ...TransactionController.Read()
  ];
};

/**
 * Capture the sales into the database
 */
export const Capture = function(): RequestHandler {
  return HttpFunction(
    "Sale was unable to be captured",
    async (req, res, next) => {
      const locals = res.locals;
      const sale: SaleCompileType = {
        shippingID: locals[ShippingController.controller.getBodyObjKey()],
        orderID: locals[OrderController.controller.getBodyObjKey()],
        cartID: locals[CartController.controller.getBodyObjKey()],
        transactionID: locals[OrderController.controller.getBodyObjKey()],
        customerID: "getCustomerID"
      };
      const doc = new Sale(sale);
      doc.validate();
      doc.save();
      return next();
    }
  );
};

/**
 * Pays for the new transaction
 */
export const Pay = function(): RequestHandler {
  return HttpFunction(
    "Sale could not successfully get paid",
    async (req, res) => {
      
    }
  );
};

export const Refund = function(): RequestHandler[] {};

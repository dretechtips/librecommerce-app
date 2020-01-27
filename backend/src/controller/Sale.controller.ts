import Koa from "koa";
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
import Controller from "../factory/Controller";
import Transaction from "../model/Transaction";
import * as PaymentController from "./Payment.controller";

const controller = new Controller("sale", Sale);

export const Create = function(type: "admin" | "client") {
  return (ctx: Koa.Context, next: Koa.Next) {
    
  }
}

/**
 * Creates a cart, shipping, and order
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
    Capture()
  ];
};
/**
 * Sends sales data to the client
 */
export const Read = function() {
  return controller.read();
};

/**
 * Capture the sales into the database
 */
export const Capture = function(): RequestHandler {
  return HttpFunction(
    "Sale was unable to be captured",
    async (req, res, next) => {
      const sale: SaleCompileType = {
        shippingID: res.locals[ShippingController.controller.getBodyObjKey()],
        orderID: res.locals[OrderController.controller.getBodyObjKey()],
        cartID: res.locals[CartController.controller.getBodyObjKey()],
        transactionID: res.locals[OrderController.controller.getBodyObjKey()],
        customerID: "getCustomerID"
      };
      const doc = new Sale(sale);
      doc.validate();
      doc.save();
      res.locals[controller.getBodyObjKey()] = sale;
      return next();
    }
  );
};

/**
 * Pays for the new transaction
 */
export const Pay = function(type: "admin" | "client"): RequestHandler[] {
  let customerID: string = "";
  return [
    HttpFunction(
      "Sale could not successfully get paid",
      async (req, res, next) => {
        const { id } = req.body[controller.getBodyObjKey()];
        const sale = (await Sale.getSelfByID(id)) as Sale | null;
        if (!sale) throw new Error("Invalid Sale ID");
        const customer = (await Customer.getSelfByID(
          sale.id()
        )) as Customer | null;
        if (!customer) throw new Error("Sale customer ID was invalid");
        customerID = customer.id();
        return next();
      }
    ),
    CustomerController.GetFromID(customerID),
    PaymentController.Pay(),
    TransactionController.Pay(type)
  ];
};

/**
 * Refunds a sales
 */
export const Refund = function(): RequestHandler[] {
  return [
    HttpFunction("Sale was unable to get refunded", async (req, res) => {
      const { id } = req.body[controller.getBodyObjKey()];
      const sale = await Sale.getSelfByID(id);
      if (!sale) throw new Error("Invalid Sale ID");
    })
  ];
};

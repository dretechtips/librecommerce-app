import { Request, Response, RequestHandler } from "express";
import Controller from "../factory/Controller";
import {
  Transactable,
  TransactablePair,
  TransactionCompileType,
  TransactionType,
  SubCost
} from "../interface/Transaction.interface";
import { HttpFunction } from "../decorator/Http.decorator";
import { Transaction } from "../model/Transaction";
import * as PaymentController from "./Payment.controller";
import Payment from "../model/Payment";
import * as CustomerController from "./Customer.controller";
import Customer from "../model/Customer";

export const controller = new Controller("transaction", Transaction);

/**
 * Creates a transaction based off the expected models and controller and stores it to the server
 */
export const Create = function(
  transactable: TransactablePair[],
  type: TransactionType
): RequestHandler {
  return HttpFunction(
    controller.getBodyObjKey().toUpperCase() + " was unable to get the cost",
    async (req, res, next) => {
      const transaction: TransactionCompileType = {
        ipAddress: req.ip,
        amountOwed: 0,
        amountPayed: 0,
        charges: [],
        tax: 0,
        type: type
      };
      // Enumericate through the res locals obj and add data.
      const transactables: Transactable[] = [];
      transactable.forEach(async cur => {
        const bodyKey = cur.controller.getBodyObjKey();
        let array: Promise<SubCost[]>[] = [];
        if (res.locals[bodyKey]) {
          const doc = new cur.model(res.locals[bodyKey]);
          array.push(doc.getCharges());
          transactables.push(doc);
        }
        const promise = await Promise.all(array);
        transaction.charges.push(
          ...promise.reduce((prev, cur) => prev.concat(...cur))
        );
      });
      const subtotal = await Transaction.calcSubtotalPrice(transactables);
      const tax = await Transaction.calcTaxPrice(transactables);
      transaction.amountOwed = subtotal;
      transaction.tax = tax;
      res.locals[controller.getBodyObjKey()] = transaction;
      return next();
    }
  );
};
/**
 * Pays for an already created transaction using the customer model
 */
export const Pay = function(type: "client" | "admin"): RequestHandler {
  return HttpFunction(
      controller.getBodyObjKey().toUpperCase() + " was unable to get paid",
      async (req, res, next) => {
        const customer = new Customer(
          res.locals[CustomerController.controller.getBodyObjKey()]
        );
        await customer.validate();
        const payment = customer.getPayment();

        return next();
      }
    ),
};

/**
 * Sends transaction data to be sent back to the client.
 */
export const Read = function() {
  return controller.read();
};

/**
 * Verify if the body id is a valid transaction id
 */
export const IsValidID = function() {
  return controller.validateID();
};

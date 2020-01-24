import { RequestHandler } from "express";
import Controller from "../factory/Controller";
import Payment from "../model/Payment";
import { HttpFunction } from "../decorator/Http.decorator";
import CreditCard from "../model/CreditCard";
import Bank from "../model/Bank";

export const controller = new Controller("payment", Payment);

export function Pay(): RequestHandler {
  return HttpFunction(
    "The payment was not accepted",
    async (req, res, next) => {
      const { methodID } = req.body[controller.getBodyObjKey()];
      if (typeof methodID !== "string")
        throw new Error("Payment Method ID is an invalid type.");
      if (CreditCard.isValidID(methodID)) {
        // Get Credit Card and talk to paypal api
        return;
      }
      if (Bank.isValidID(methodID)) {
        // Get Bank Account and talk to paypal api
        return;
      }
      throw new Error("No valid method id.");
    }
  );
}

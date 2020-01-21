import { Request, Response } from "express";
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
import Model from "../factory/Model";

export class TransactionController<
  T extends ReturnType<typeof Model>
> extends Controller<T> {
  private transactables: TransactablePair[];
  constructor(bodyObjKey: string, model: T, transactables: TransactablePair[]) {
    super(bodyObjKey, model);
    this.transactables = transactables;
  }
  public getTransactables(): TransactablePair[] {
    return this.transactables;
  }
  /**
   * Stores the server generated transaction in the res.locals[bodyObjKey];
   * @param type The type of transaction
   */
  public getCost(type: TransactionType) {
    return [
      HttpFunction(
        this.getBodyObjKey().toUpperCase() + " was unable to get the cost",
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
          this.transactables.forEach(async cur => {
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
          const subtotal = Transaction.calcSubtotalPrice(transactables);
          const tax = Transaction.calcTaxPrice(transactables);
          transaction.amountOwed = subtotal;
          transaction.tax = tax;
          res.locals[this.getBodyObjKey()] = transaction;
          return next();
        }
      )
    ];
  }
}

export default TransactionController;

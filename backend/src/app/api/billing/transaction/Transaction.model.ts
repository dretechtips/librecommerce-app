import ModelFactory from "src/app/common/model/Model.factory";
import { prop } from "@typegoose/typegoose";
import CostSchema from "../cost/Cost.schema";
import { TransactionDOT, Transactable } from "./Transaction.interface";
import Payments from "./payments/Payments.model";
import {
  VoidTransactionSchema,
  VoidTransaction,
} from "./void_transaction/VoidTransaction.model";
import {
  TransactionMergeException,
  TransactionCaptureException,
} from "./Transaction.exception";
import { SaleTransactionSchema } from "./sale_transaction/SaleTransaction.model";
import { RefundTransactionSchema } from "./refund_transaction/RefundTransaction.model";

export class TransactionSchema implements TransactionDOT {
  /**
   *
   * @param charges Values are in terms of effect on the sellers.
   */
  constructor(charges: (CostSchema | Transactable)[]) {
    this.charges = charges.map((cur) =>
      cur instanceof CostSchema ? cur : cur.cost
    );
    this.rebase();
  }

  @prop({ required: true })
  public amountOwed: number;
  @prop({ required: true })
  public amountPayed: number;
  @prop({ required: true })
  public tax: number;
  @prop({ required: true, min: 0, max: 100 })
  public taxRate: number;
  @prop({ required: true })
  public charges: CostSchema[];
  @prop({ required: true, default: false })
  public captured: boolean;
  @prop({ required: false })
  public paymentID?: string;

  /**
   * Takes the charges and automatically recalculate the transaction.
   * @throws {NegativeTransactionException} while creating a negative transaction.
   */
  protected rebase() {
    const subtotal = this.getTrueCharges().reduce(
      (prev, cur) => prev + cur.value,
      0
    );
    this.tax = (this.taxRate * subtotal) / 100;
    this.amountOwed = subtotal + this.tax;
  }

  public addCost(cost: CostSchema): this {
    this.charges.push(cost);
    this.rebase();
    return this;
  }

  public removeCost(index: number): this {
    this.charges.splice(index, 1);
    this.rebase();
    return this;
  }

  public capture(paymentID: string) {
    if (this.captured === true) throw new TransactionCaptureException();
    this.paymentID = paymentID;
    this.captured = true;
  }

  public getTrueCharges(): CostSchema[] {
    return this.charges;
  }

  public void(): VoidTransaction {
    return new VoidTransaction(this);
  }
}

export type TransactionSchemaType = TransactionSchema;

export class Transaction extends ModelFactory(TransactionSchema) {}

export default Transaction;

import Class from "src/app/common/class/Class.factory";
import CostSchema from "./cost/Cost.schema";
import { TransactionDOT, TransactionType } from "./Transaction.interface";
import TransactionModel from "./Transaction.model";

class Transaction extends Class<TransactionModel> {
  constructor(transaction: TransactionModel) {
    super(transaction);
  }
  public getAmountOwed() {
    return this.doc().amountOwed;
  }
  public getAmountPayed() {
    return this.doc().amountPayed;
  }
  public getTax() {
    return this.doc().tax;
  }
  public getCharges() {
    return this.doc().charges;
  }
  public getRefundableCharges() {
    return this.doc().charges;
  }
  public getNonRefundableCharges() {
    return this.doc().charges;
  }
}

export class FulfilledTransaction extends Transaction {
  constructor(transaction: TransactionModel) {
    super(transaction);
    if (typeof transaction.paymentID !== "string") throw new TypeError();
  }
  public getPayment(): string {
    return this.doc().paymentID as string;
  }
}

export class AuthorizedTransaction extends Transaction {
  public static fromData(pretax: number, tax: number, costs: CostSchema[]) {
    const dot: TransactionDOT = {
      type: TransactionType.AUTHORIZED,
      amountOwed: pretax + tax,
      amountPayed: 0,
      tax: tax,
      charges: costs
    };
    return new this(new TransactionModel(dot));
  }
  constructor(transaction: TransactionModel) {
    super(transaction);
    if (this.doc().type !== TransactionType.AUTHORIZED) throw new TypeError();
  }
  public void() {
    const dot: TransactionDOT = {
      ...this.doc(),
      type: TransactionType.VOID
    };
    return new VoidTransaction(new TransactionModel(dot));
  }

  public capture(paymentID: string): FulfilledTransaction {
    return this.getAmountPayed() < 0
      ? this.refund(paymentID)
      : this.sale(paymentID);
  }

  public sale(paymentID: string) {
    if (this.getAmountPayed() < 0) throw new Error("Invalid Sale Amount Payed");
    const dot: TransactionDOT = {
      ...this.doc(),
      paymentID: paymentID,
      type: TransactionType.SALE
    };
    return new SaleTransaction(new TransactionModel(dot));
  }

  public refund(paymentID: string) {
    if (this.getAmountPayed() > 0) throw new Error("Invalid Sale Amount Payed");
    const dot: TransactionDOT = {
      ...this.doc(),
      paymentID: paymentID,
      type: TransactionType.SALE
    };
    return new RefundedTransaction(new TransactionModel(dot));
  }
}

export class RefundedTransaction extends FulfilledTransaction {
  constructor(transaction: TransactionModel) {
    super(transaction);
    if (this.doc().type !== TransactionType.REFUND) throw new TypeError();
  }
}

export class SaleTransaction extends FulfilledTransaction {
  constructor(transaction: TransactionModel) {
    super(transaction);
    if (this.doc().type !== TransactionType.SALE) throw new TypeError();
  }
  public refund(amount: number) {
    const dot: TransactionDOT = {
      ...this.doc(),
      amountOwed: amount,
      amountPayed: amount,
      type: TransactionType.REFUND
    };
    return new RefundedTransaction(new TransactionModel(dot));
  }
}

export class VoidTransaction extends Transaction {
  constructor(transaction: TransactionModel) {
    super(transaction);
    if (this.doc().type !== TransactionType.VOID) throw new TypeError();
  }
}

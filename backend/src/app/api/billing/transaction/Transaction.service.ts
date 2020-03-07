import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import CostSchema from "./cost/Cost.schema";
import {
  AuthorizedTransaction,
  FulfilledTransaction,
  RefundedTransaction,
  SaleTransaction
} from "./Transaction.class";
import { Transactable } from "./Transaction.interface";
import Transaction from "./Transaction.model";

@Injectable()
export class TransactionService extends Service<typeof Transaction> {
  /**
   * This is only for Texas, USA. Interstate commerce has different tax laws.
   */
  private taxRate: number = 0.0725;
  constructor() {
    super(Transaction);
  }
  public toCosts(transactable: Transactable[]): CostSchema[] {
    return transactable.reduce((total, cur) => {
      total.push(...cur.costs);
      return total;
    }, [] as CostSchema[]);
  }
  private getCost(costs: CostSchema[]): number {
    return costs.reduce((total, cur) => total + cur.value, 0);
  }
  private getTaxCost(costs: CostSchema[]): number {
    return this.getCost(costs) * this.taxRate;
  }
  public async authorizeT(transactable: Transactable[]): Promise<Transaction> {
    return this.authorizeC(this.toCosts(transactable));
  }
  public async authorizeC(costs: CostSchema[]): Promise<Transaction> {
    const subcost = this.getCost(costs);
    const tax = this.getTaxCost(costs);
    const transaction = AuthorizedTransaction.fromData(subcost, tax, costs);
    return this.add(transaction);
  }
  public async capture(
    transactionID: string,
    paymentID: string
  ): Promise<FulfilledTransaction> {
    const transaction = new AuthorizedTransaction(
      await this.get(transactionID)
    );
    // Validate Payment ID
    const capture = transaction.capture(paymentID);
    await capture.doc().save();
    return capture;
  }

  public async sale(
    transactable: Transactable[],
    paymentID: string
  ): Promise<SaleTransaction> {
    const auth = await this.authorize(transactable);
    const transaction = new AuthorizedTransaction(auth);
    // TALK TO PAYPAL
    const sale = transaction.sale(paymentID);
    await sale.doc().save();
    return sale;
  }

  public async refund(
    transactionID: string,
    paymentID: string,
    amount: number
  ): Promise<RefundedTransaction> {
    const sale = new SaleTransaction(await this.get(transactionID));
    // TALK TO PAYPAL
    return sale.refund(amount);
  }
}

export default TransactionService;

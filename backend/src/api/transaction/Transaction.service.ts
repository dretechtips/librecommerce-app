import { Injectable } from "@nestjs/common";
import { Request } from "express";
import TagService from "src/common/services/Tag.service";
import { TransactionDOT, Transactable, SubCost } from "./Transaction.interface";
import ServiceFactory from "src/util/Service.factory";
import Transaction from "./Transaction.model";
import { PaymentMethod } from "./payment/Payment.interface";
import PayflowService from "src/vendor/paypal/payflow/Payflow.service";

@Injectable()
export class TransactionService extends ServiceFactory<TransactionDOT>(
  Transaction
) {
  /**
   * This is only for Texas, USA. Interstate commerce has different tax laws.
   */
  private taxRate: number = 0.0725;
  constructor(
    public readonly tag: TagService<TransactionDOT>,
    private readonly payflow: PayflowService
  ) {
    super();
  }
  public async getChargeList(
    ...transactables: Transactable[]
  ): Promise<SubCost[]> {
    const costs = await Promise.all(transactables.map(cur => cur.getCharges()));
    const charges = costs.reduce((total, cur) => total.concat(cur));
    return charges;
  }
  public calcPrice(costs: SubCost[]): number {
    return costs.reduce((total, cur) => total + cur.cost, 0);
  }
  public getTaxCost(costs: SubCost[]): number {
    return this.calcPrice(costs) * this.taxRate;
  }
  public async addUnprocessed(
    ip: string,
    ...transactables: Transactable[]
  ): Promise<Transaction> {
    const subcosts = await this.getChargeList(...transactables);
    const transactionDOT: TransactionDOT = {
      ipAddress: ip,
      amountOwed: this.calcPrice(subcosts) + this.getTaxCost(subcosts),
      amountPayed: 0,
      charges: subcosts,
      tax: this.getTaxCost(subcosts),
      type: "sales"
    };
    const transaction = new Transaction(transactionDOT);
    transaction.save();
    return transaction;
  }
  public async capture(
    payment: PaymentMethod,
    transactionID: string
  ): Promise<void> {
    const transaction = (await Transaction.getSelfByID(
      transactionID
    )) as Transaction | null;
    if (!transaction) throw new Error("Invalid Transaction ID");
    await this.payflow.payWithPaymentMethod(payment, transaction);
  }
}

export default TransactionService;

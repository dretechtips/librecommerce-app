import { Injectable } from "@nestjs/common";
import { Request } from "express";
import {
  TransactionDOT,
  Transactable,
  TransactionType
} from "./Transaction.interface";
import Service from "src/app/common/service/Service.factory";
import Transaction from "./Transaction.model";
import Payments from "../payments/Payments.model";
import { PaymentOption } from "../payments/Payments.interface";
import CostSchema from "./cost/Cost.schema";

@Injectable()
export class TransactionService extends Service<typeof Transaction> {
  /**
   * This is only for Texas, USA. Interstate commerce has different tax laws.
   */
  private taxRate: number = 0.0725;
  constructor() {
    super(Transaction);
  }
  private async extractSubCosts(
    transactables: Transactable[]
  ): Promise<CostSchema[]> {
    const costs = await Promise.all(transactables.map(cur => cur.getCosts()));
    const charges = costs.reduce((total, cur) => total.concat(cur));
    return charges;
  }
  private getCost(costs: CostSchema[]): number {
    return costs.reduce((total, cur) => total + cur.value, 0);
  }
  private getTaxCost(costs: CostSchema[]): number {
    return this.getCost(costs) * this.taxRate;
  }
  public async unpayed(
    transactable: Transactable[],
    type: TransactionType
  ): Promise<Transaction> {
    const breakdown = await this.extractSubCosts(transactable);
    const tax = this.getTaxCost(breakdown);
    const subcost = this.getCost(breakdown);
    const transactionDOT: TransactionDOT = {
      amountOwed: tax + subcost,
      amountPayed: 0,
      charges: breakdown,
      tax: tax,
      type: type
    };
    return this.add(transactionDOT);
  }
  public async capture(
    transactionID: string,
    paymentID: string
  ): Promise<void> {
    const transaction = await this.get(transactionID);
    transaction.amountPayed = transaction.amountPayed;
    await transaction.save();
  }
}

export default TransactionService;

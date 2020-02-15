import { Injectable } from "@nestjs/common";
import { Request } from "express";
import {
  TransactionDOT,
  Transactable,
  SubCost,
  TransactionType
} from "./Transaction.interface";
import Service from "src/app/common/service/Service.factory";
import Transaction from "./Transaction.model";
import Payments from "../payments/Payments.model";
import { PaymentOption } from "../payments/Payments.interface";

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
  ): Promise<SubCost[]> {
    const costs = await Promise.all(
      transactables.map(cur => cur.getSubCosts())
    );
    const charges = costs.reduce((total, cur) => total.concat(cur));
    return charges;
  }
  private getCost(costs: SubCost[]): number {
    return costs.reduce((total, cur) => total + cur.cost, 0);
  }
  private getTaxCost(costs: SubCost[]): number {
    return this.getCost(costs) * this.taxRate;
  }
  public async unpayed(
    transactable: Transactable[],
    type: TransactionType
  ): Promise<string> {
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
    return (await this.add(transactionDOT))._id;
  }
  public async capture(
    transactionID: string,
    payment: PaymentOption
  ): Promise<void> {
    const transaction = await this.get(transactionID);
    transaction.amountPayed = transaction.amountPayed;
    await transaction.save();
  }
}

export default TransactionService;

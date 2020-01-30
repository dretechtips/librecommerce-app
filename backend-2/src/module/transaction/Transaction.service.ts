import { Injectable } from "@nestjs/common";
import { Request } from "express";
import TagService from "src/common/services/Tag.service";
import { TransactionDOT, Transactable, SubCost } from "./Transaction.interface";
import ServiceFactory from "src/util/Service.factory";
import Transaction from "./Transaction.model";

@Injectable()
export class TransactionService extends ServiceFactory<TransactionDOT>(
  Transaction
) {
  /**
   * This is only for Texas, USA. Interstate commerce has different tax laws.
   */
  private taxRate: number = 0.0725;
  constructor(public readonly tag: TagService<TransactionDOT>) {
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
    req: Request,
    ...transactables: Transactable[]
  ): Promise<Transaction> {
    const subcosts = await this.getChargeList(...transactables);
    const transactionDOT: TransactionDOT = {
      ipAddress: req.ip,
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
}

export default TransactionService;

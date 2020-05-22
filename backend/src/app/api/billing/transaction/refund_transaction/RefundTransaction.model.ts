import Transaction, { TransactionSchema } from "../Transaction.model";
import { ExtendedModelFactory } from "src/app/common/model/Model.factory";
import SaleTransaction from "../sale_transaction/SaleTransaction.model";
import CostSchema from "../../cost/Cost.schema";
import { Transactable } from "../Transaction.interface";
import { NegativeTransactionException } from "../Transaction.exception";

export class RefundTransactionSchema extends TransactionSchema {
  /**
   * The charges are in terms of refunded amount.
   */
  constructor(charges: (CostSchema|Transactable)[]) {
    super(charges);
    if(this.amountOwed < 0)
      throw new NegativeTransactionException();
  }

  public getTrueCharges(): CostSchema[] {
    return this.charges.map(cur => new CostSchema(cur.name, -cur.value));
  }

  public rebase() {
    super.rebase();
    if(this.amountOwed < 0)
      throw new NegativeTransactionException();
  }

  

}

export class RefundTransaction extends ExtendedModelFactory(Transaction, RefundTransactionSchema) {}
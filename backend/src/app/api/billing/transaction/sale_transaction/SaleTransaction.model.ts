import Transaction, { TransactionSchema } from "../Transaction.model";
import { SaleTransactionDOT } from "./SaleTransaction.interface";
import { ExtendedModelFactory } from "src/app/common/model/Model.factory";
import { RefundTransaction, RefundTransactionSchema } from "../refund_transaction/RefundTransaction.model";
import CostSchema from "../../cost/Cost.schema";
import { RefundTransactionDOT } from "../refund_transaction/RefundTransaction.interface";
import { prop } from "@typegoose/typegoose";
import { TransactionNotRefundableException } from "./SaleTransaction.exception";
import { Transactable } from "../Transaction.interface";
import { NegativeTransactionException } from "../Transaction.exception";

export class SaleTransactionSchema extends TransactionSchema implements SaleTransactionDOT {

  constructor(charges: (CostSchema|Transactable)[]) {
    super(charges);
    if(this.amountOwed < 0)
      throw new NegativeTransactionException();
  }

  @prop({required: true})
  public isRefundable: boolean;
  
  /**
   * Creates an unauthorized refund transaction based off this transaction.
   */
  public toRefund(): RefundTransaction {
    if(!this.isRefundable) throw new TransactionNotRefundableException();
    return new RefundTransaction(new RefundTransactionSchema(this.charges));
  }

  public getTrueCharges() {
    return this.charges;
  }

  public rebase() {
    super.rebase();
    if(this.amountOwed < 0)
      throw new NegativeTransactionException();
  }

}

export class SaleTransaction extends ExtendedModelFactory(Transaction, SaleTransactionSchema) {}

export default SaleTransaction;
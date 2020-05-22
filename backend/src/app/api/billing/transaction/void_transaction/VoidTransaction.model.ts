import Transaction, { TransactionSchema } from "../Transaction.model";
import { ExtendedModelFactory } from "src/app/common/model/Model.factory";
import CostSchema from "../../cost/Cost.schema";

export class VoidTransactionSchema extends TransactionSchema {

  public getTrueCharges(): CostSchema[] {
    return this.charges.map(cur => new CostSchema(cur.name, 0));
  }

}

export class VoidTransaction extends ExtendedModelFactory (Transaction, VoidTransactionSchema) {}
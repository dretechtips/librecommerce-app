import Mongoose from "mongoose";
import { PaymentCompileType } from "../../../interface/Payment.interface";
import Model from "../../../util/Model.factory";
import CreditCard from "./credit_card/CreditCard.model";
import Bank from "./ach/Bank.model";

const PaymentRuntimeType: Mongoose.TypedSchemaDefinition<PaymentCompileType> = {
  creditCardIDs: [String],
  bankIDs: [String]
};

const PaymentSchema = new Mongoose.Schema<PaymentCompileType>(
  PaymentRuntimeType
);

export class Payment extends Model("Payment", PaymentSchema) {
  public async getCreditCards(): Promise<CreditCard[] | null> {
    return CreditCard.getSelvesByIDs(this.data().creditCardIDs) as Promise<
      CreditCard[] | null
    >;
  }
  public async getBankAccounts(): Promise<Bank[] | null> {
    return Bank.getSelvesByIDs(this.data().bankIDs) as Promise<Bank[] | null>;
  }
  public async addCreditCard(id: string) {
    this.addID(data => data.creditCardIDs, CreditCard, id);
  }
  public addBankAccount(id: string) {
    this.addID(data => data.bankIDs, Bank, id);
  }
  public removeCreditCard(id: string) {
    this.removeID(data => data.creditCardIDs, id);
  }
  public removeBankAccount(id: string) {
    this.removeID(data => data.bankIDs, id);
  }
}

export default Payment;
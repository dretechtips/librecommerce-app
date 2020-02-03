import Mongoose from "mongoose";
import { PaymentCompileType } from "../../../interface/Payment.interface";
import Model from "../../../util/Model.factory";
import Card from "./card/Card.model";
import Bank from "./ach/Bank.model";
import { CardDOT } from "./card/Card.interface";

const PaymentRuntimeType: Mongoose.TypedSchemaDefinition<PaymentCompileType> = {
  creditCardIDs: [String],
  bankIDs: [String]
};

const PaymentSchema = new Mongoose.Schema<PaymentCompileType>(
  PaymentRuntimeType
);

export class Payment extends Model("Payment", PaymentSchema) {
  public async getCards(): Promise<Card[] | null> {
    return Card.getSelvesByIDs(this.data().creditCardIDs) as Promise<
      Card[] | null
    >;
  }
  public async getBankAccounts(): Promise<Bank[] | null> {
    return Bank.getSelvesByIDs(this.data().bankIDs) as Promise<Bank[] | null>;
  }
  public async addCreditCard(id: string) {
    this.addID(data => data.creditCardIDs, Card, id);
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
  public async get(id: string): Promise<Card | Bank | null> {
    const card = await Card.getSelfByID(id);
    if (card) return card as Card;
    const bank = await Bank.getSelfByID(id);
    if (bank) return bank as Bank;
    return null;
  }
}

export default Payment;

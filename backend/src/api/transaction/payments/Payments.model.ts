import Mongoose from "mongoose";
import { PaymentsDOT } from "./Payments.interface";
import Model from "../../../common/factory/Model.factory";
import Card from "./card/Card.model";
import Bank from "./bank/Bank.model";
import { CardDOT } from "./card/Card.interface";
import { PaymentOption } from "./Payments.interface";

const PaymentsRuntimeType: Mongoose.TypedSchemaDefinition<PaymentsDOT> = {
  ccIDs: [String],
  bankIDs: [String]
};

const PaymentsSchema = new Mongoose.Schema<PaymentsDOT>(PaymentsRuntimeType);

export class Payments extends Model("Payment", PaymentsSchema) {
  public async getCards(): Promise<Card[] | null> {
    return Card.getSelvesByIDs(this.data().ccIDs) as Promise<Card[] | null>;
  }
  public async getBankAccounts(): Promise<Bank[] | null> {
    return Bank.getSelvesByIDs(this.data().bankIDs) as Promise<Bank[] | null>;
  }
  public async addCreditCard(id: string) {
    this.addID(data => data.ccIDs, Card, id);
  }
  public addBankAccount(id: string) {
    this.addID(data => data.bankIDs, Bank, id);
  }
  public removeCreditCard(id: string) {
    this.removeID(data => data.ccIDs, id);
  }
  public removeBankAccount(id: string) {
    this.removeID(data => data.bankIDs, id);
  }
  public async get(id: string): Promise<PaymentOption | null> {
    const card = await Card.getSelfByID(id);
    if (card) return card as Card;
    const bank = await Bank.getSelfByID(id);
    if (bank) return bank as Bank;
    return null;
  }
}

export default Payments;

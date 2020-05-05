import { BankDOT } from "./Bank.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import { prop } from "@typegoose/typegoose";

class BankSchema implements BankDOT {
  private static SetAccount(val: number): number {
    // TODO
  }
  private static SetRouting(val: number): number {
    // TODO
  }
  @prop({required: true})
  country: string;
  @prop({required: true, set: BankSchema.SetAccount})
  account: number;
  @prop({required: true, set: BankSchema.SetRouting})
  routing: number;
}

export class Bank extends ModelFactory(BankSchema) {}

export default Bank;

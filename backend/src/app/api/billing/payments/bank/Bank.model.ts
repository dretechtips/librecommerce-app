import Mongoose from "mongoose";
import { BankDOT } from "./Bank.interface";
import { Typegoose } from "typegoose";
import ModelFactory from "src/app/common/model/Model.factory";

class BankSchema extends Typegoose implements BankDOT {
  country: string;
  account: number;
  routing: number;
}

export class Bank extends ModelFactory(BankSchema) {}

export default Bank;

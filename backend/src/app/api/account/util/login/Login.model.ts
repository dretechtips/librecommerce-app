import Mongoose from "mongoose";
import { Typegoose, prop } from "typegoose";
import { LoginDOT } from "./Login.interface";
import ModelFactory from "src/app/common/model/Model.factory";

class LoginSchema extends Typegoose implements LoginDOT {
  @prop({ required: true })
  accountID: string;
  @prop({ required: true })
  timestamp: Date;
}

export class Login extends ModelFactory(LoginSchema) {}

import Mongoose from "mongoose";
import { UserDOT } from "./User.interface";
import { Typegoose, prop } from "typegoose";
import ModelFactory from "src/app/common/model/Model.factory";

class UserSchema extends Typegoose implements UserDOT {
  @prop({ required: true })
  accountID: string;
  @prop({ required: true })
  scheduleID: string;
  @prop({ required: true })
  position: string;
  @prop({ required: true })
  lastPayed: string;
  @prop({ required: true })
  payrollID: string;
}

export class User extends ModelFactory(UserSchema) {}

export default User;

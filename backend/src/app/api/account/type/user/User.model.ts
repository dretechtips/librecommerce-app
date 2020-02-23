import ModelFactory from "src/app/common/model/Model.factory";
import { prop, Typegoose } from "typegoose";
import { UserDOT, UserPositions } from "./User.interface";

class UserSchema extends Typegoose implements UserDOT {
  @prop({ required: true })
  accountID: string;
  @prop({ required: true })
  scheduleID: string;
  @prop({ required: true, enum: UserPositions })
  position: UserPositions;
  @prop({ required: true })
  lastPayed: Date;
  @prop({ required: true })
  payrollID: string;
}

export class User extends ModelFactory(UserSchema) {}

export default User;

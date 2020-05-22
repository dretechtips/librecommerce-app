import { InternalUserDOT, InternalPosition } from "./InternalUser.interface";
import User, { UserSchema } from "../User.model";
import { ExtendedModelFactory } from "src/app/common/model/Model.factory";
import { prop } from "@typegoose/typegoose";

class InternalUserSchema extends UserSchema implements InternalUserDOT {
  @prop({required: true, enum: InternalPosition})
  public position: InternalPosition;
  @prop({required: true})
  public scheduleID: string;
  @prop({required: true})
  public payrollID: string;
}

export class InternalUser extends ExtendedModelFactory(User, InternalUserSchema) {}

export default InternalUser;
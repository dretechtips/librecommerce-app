import { InternalDOT, InternalPosition } from "./Internal.interface";
import User, { UserSchema } from "../User.model";
import { ExtendedModelFactory } from "src/app/common/model/Model.factory";
import { prop } from "@typegoose/typegoose";

class InternalSchema extends UserSchema implements InternalDOT {
  @prop({required: true, enum: InternalPosition})
  public position: InternalPosition;
  @prop({required: true})
  public scheduleID: string;
  @prop({required: true})
  public payrollID: string;
}

export class Internal extends ExtendedModelFactory(User, InternalSchema) {}

export default Internal;
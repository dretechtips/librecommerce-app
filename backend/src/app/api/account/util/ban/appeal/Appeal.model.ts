import ModelFactory from "src/app/common/model/Model.factory";
import { prop, Ref } from "@typegoose/typegoose";
import { AppealDOT, AppealStatus } from "./Appeal.interface";

class AppealSchema implements AppealDOT {
  @prop({ required: true })
  public message: string;
  @prop({required: true, default: ""})
  public reviewedBy: string
  @prop({required: true, enum: AppealStatus, default: AppealStatus.PROCESSING})
  public status: AppealStatus;
}

export class Appeal extends ModelFactory(AppealSchema) {}

export default Appeal;

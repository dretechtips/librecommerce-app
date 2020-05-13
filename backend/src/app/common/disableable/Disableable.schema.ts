import { DisableableDOT } from "./Disableable.interface";
import { prop } from "@typegoose/typegoose";

export class DisableableSchema implements DisableableDOT {
  @prop({required: true, default: true})
  public active: boolean;
}

export default DisableableSchema;
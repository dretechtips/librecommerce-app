import { Typegoose, prop } from "typegoose";
import { RecurringDOT } from "./Recurring.interface";
import { CalendarDay, CalendarSpan } from "../../Calendar.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import { EventDOT } from "../Event.interface";

class RecurringSchema extends Typegoose implements RecurringDOT {
  @prop({ required: true, enum: CalendarDay })
  public day: CalendarDay;
  @prop({ required: true, enum: CalendarSpan })
  public span: CalendarSpan;
  @prop({ required: true })
  public start: Date;
  @prop({ required: false })
  public eventID?: string;
}

export class Recurring extends ModelFactory(RecurringSchema) {}

export default Recurring;

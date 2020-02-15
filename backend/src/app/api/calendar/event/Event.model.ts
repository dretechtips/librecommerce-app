import { Typegoose, prop } from "typegoose";
import ModelFactory from "src/app/common/model/Model.factory";
import { EventDOT } from "./Event.interface";

class EventSchema extends Typegoose implements EventDOT {
  @prop({ required: true })
  public date: string;
  @prop({ required: true })
  public start: string;
  @prop({ required: true })
  public end: string;
  @prop({ required: true })
  public name: string;
  @prop({ required: true })
  public description: string;
}

export class Event extends ModelFactory(EventSchema) {}

export default Event;

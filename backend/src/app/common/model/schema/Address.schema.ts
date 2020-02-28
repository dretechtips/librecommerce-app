import { Typegoose } from "typegoose";
import { prop } from "typegoose/lib/prop";
import State from "../../enum/continent/country/US/State";

export class AddressSchema extends Typegoose {
  constructor(street: string, city: string, state: State) {
    super();
    this.street = street;
    this.city = city;
    this.state = state;
    this.country = "US";
  }
  @prop({ required: true })
  public street: string;
  @prop({ required: true })
  public city: string;
  @prop({ required: true })
  public state: State;
  @prop({ required: true })
  public country: string;
}

export default AddressSchema;

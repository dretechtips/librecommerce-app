import { Typegoose } from "typegoose";

export class Class<T extends Typegoose> {
  constructor(private readonly _doc: T) {}
  public doc() {
    return this._doc;
  }
}

export default Class;

import { Document, Model } from "mongoose";

export class Class<T extends InstanceType<Model<Document>>> {
  constructor(private readonly _doc: T) {}
  public doc() {
    return this._doc;
  }
}

export default Class;

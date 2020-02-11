import { Typegoose } from "typegoose";
import { Model, Document } from "mongoose";

export function ModelFactory<T extends Typegoose>(model: { new (): T }) {
  return new model().getModelForClass(model) as Model<T & Document>;
}

export default ModelFactory;

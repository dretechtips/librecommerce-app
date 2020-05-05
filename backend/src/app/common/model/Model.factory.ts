import {
  getModelForClass,
  getDiscriminatorModelForClass,
} from "@typegoose/typegoose";
import { Model, Document } from "mongoose";
import { AnyParamConstructor } from "@typegoose/typegoose/lib/types";

export function ModelFactory<T>(schema: { new (): T }) {
  return getModelForClass(schema) as Model<T & Document>;
}

export function ExtendedModelFactory<T, K extends AnyParamConstructor<T>>(
  extend: Model<T & Document>,
  schema: K,
  discriminator?: string
) {
  return getDiscriminatorModelForClass<T, K>(
    extend,
    schema,
    discriminator
  ) as Model<K & Document & T>;
}

export default ModelFactory;

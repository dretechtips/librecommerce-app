import { Document, Model } from "mongoose";
import { Typegoose } from "typegoose";

type Storable =
  | boolean
  | number
  | string
  | boolean[]
  | number[]
  | string[]
  | null
  | { [x: string]: Storable };

export interface DefaultPersistantData {
  timestamp: string;
}

export type PersistantData<T> = {
  [C in keyof T]: T[C] extends Storable ? T[C] : never;
};

export interface PersistableData {
  persist(): Storable;
}

export type ExtractSchema<T extends Model<Document>> = T extends Model<
  infer D & Document
>
  ? D
  : never;

export type ExtractSchemaData<T extends Model<Document>> = Omit<
  ExtractSchema<T>,
  keyof Typegoose
>;

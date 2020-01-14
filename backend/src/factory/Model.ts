import {
  PersistantData,
  DefaultPersistantData
} from "../interface/Model.interface";
import Mongoose from "mongoose";

/**
 * @typedef D Data Schema
 */
export function Model<D extends {}>(name: string, schema: Mongoose.Schema<D>) {
  return class {
    private model: Mongoose.Model<D & Mongoose.Document, {}>;
    constructor(data: any) {
      this.model = Mongoose.model(name, schema);
    }
    public getModel() {
      return this.model;
    }
    public save() {}
    public update() {}
    public delete() {}
  };
}

export default Model;

// export abstract class Model<T extends PersistantData<T>, C extends T> {
//   protected data: Partial<C> & DefaultPersistantData;
//   constructor(data: Partial<C>) {
//     this.data = { ...data, id: uuid(), timestamp: new Date().toString() };
//   }
//   private save() {

//   }
//   private update() {

//   }
//   private delete() {

//   }
// }

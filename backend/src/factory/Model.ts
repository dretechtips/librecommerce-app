import {
  PersistantData,
  DefaultPersistantData,
  ModelType
} from "../interface/Model.interface";
import Mongoose from "mongoose";
import uuid from "uuid/v4";
import events from "events";

class ModelEvents {
  protected onSave(): void {
    return;
  }
  protected onDelete(): void {
    return;
  }
  protected onUpdate(): void {
    return;
  }
}

/**
 * @typedef D Data Schema
 */
export function Model<D extends {}>(
  name: string,
  schema: Mongoose.Schema<D>,
  inherit: ModelType[] = [],
  isTemplate: boolean = false
) {
  schema.add({
    timestamp: String
  });
  class Model extends ModelEvents {
    public static readonly model: Mongoose.Model<
      D & Mongoose.Document & DefaultPersistantData,
      {}
    > = Mongoose.model(name, schema);
    public static async getSelfByID(id: string): Promise<Model | null> {
      const func = Model.model.findById(id);
      const data = await func.exec();
      return data ? new Model(data) : null;
    }
    public static async getSelvesByIDs(ids: string[]): Promise<Model[] | null> {
      const array: Promise<Mongoose.Document | null>[] = [];
      for (let i = 0; i < ids.length; i++) {
        const func = Model.model.findById(ids[i]);
        const data = func.exec();
        array.push(data);
      }
      let result = await Promise.all(array);
      if (result.length === 0) return null;
      return result.filter(data => data !== null).map(data => new Model(data));
    }
    public static async getSelfBy(
      prop: keyof D,
      value: string
    ): Promise<Model[] | null> {}
    public static async isValidID(id: string) {
      const data = await Model.getSelfByID(id);
      if (data) return true;
      else return false;
    }
    private document: Mongoose.Document & D & DefaultPersistantData;
    constructor(data: any) {
      super();
      if (data instanceof Mongoose.Document) {
        if (this.isValidDocument(data)) this.document = data;
      }
      this.document = new Model.model(data);
      this.document.timestamp = new Date().toString();
    }
    // TODO: Improve Verification Methods (Verify value as well)
    private isValidDocument(
      doc: Mongoose.Document
    ): doc is Mongoose.Document & D & DefaultPersistantData {
      const invalidProps = Object.keys({ ...schema.obj, timestamp: String })
        .map(key => {
          if (doc.schema.get(key)) return true;
          return false;
        })
        .filter(cur => cur === false);
      if (invalidProps.length > 0) return false;
      return true;
    }
    private stringToNum() {}
    public data(): D {
      const BaseModel = Mongoose.model("Model");
      const baseDocument = new BaseModel();
      const baseDocKeys = Object.keys(baseDocument);
      const safeData: any = {};
      Object.keys(this.document).forEach(key => {
        const doc = this.document;
        if (!baseDocKeys.find(cur => cur === key))
          safeData[key] = this.document[key as keyof typeof doc];
      });
      return safeData;
    }
    public meta(): { timestamp: string; _id: string } {
      return this.document;
    }
    public save() {
      if (isTemplate) {
        return console.log("Cannot save a template model.");
      }
      this.document.save();
      this.onSave();
      return;
    }
    public update() {
      if (isTemplate) return console.log("Cannot update a template model.");
      //this.document.update();
      this.onUpdate();
      return;
    }
    public delete() {
      if (isTemplate) return console.log("Cannot delete a template model.");
      this.document.remove();
      this.onDelete();
      return;
    }
    public id() {
      return this.document.id as string;
    }
    public async validate() {
      inherit.forEach(async Model => await new Model(this.data()).validate());
      return this.document.validate();
    }
  }
  return Model;
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

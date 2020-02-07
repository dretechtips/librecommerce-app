import {
  PersistantData,
  DefaultPersistantData
} from "../interface/Model.interface";
import Mongoose from "mongoose";
import { ExtractAllProps } from "../../../util/Types";
import DatabasesModule from "../databases/Databases.module";

export const mongoose = new Mongoose.Mongoose();

/**
 * @typedef D Data Schema
 */
export function Model<D extends {}>(
  name: string,
  schema: Mongoose.Schema<D>,
  inherit: { new (data: any): InstanceType<ReturnType<typeof Model>> }[] = [],
  isTemplate: boolean = false
) {
  schema.add({
    timestamp: String
  });
  class Model {
    /**
     * Mongoose Base Model API
     */
    public static readonly model: Mongoose.Model<
      D & Mongoose.Document & DefaultPersistantData,
      {}
    > = mongoose.model(name, schema);
    /**
     * Gets the document of the model by the id
     * @param id Mongoose Object ID
     */
    public static async getSelfByID(id: string): Promise<Model | null> {
      const func = Model.model.findById(id);
      const data = await func.exec();
      return data ? new Model(data) : null;
    }
    /**
     * Gets a list of model documents based off the ids
     * @param ids Mongoose Object IDs
     */
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
    /**
     * Finds a model document by the property of the data by a depth of one
     * @param prop Depth of One data key
     * @param value The value of the prop your looking for
     */
    public static async getSelfBy(props: Partial<D>): Promise<Model[] | null> {}
    public static async isValidID(id: string): Promise<boolean> {
      const data = await Model.getSelfByID(id);
      if (data) return true;
      else return false;
    }
    /**
     * Stored document of a model
     */
    private document: Mongoose.Document & D & DefaultPersistantData;
    /**
     * Creates a document, adds the meta data.
     * @param data Any data that going to be used by the model
     */
    constructor(data: any) {
      if (data instanceof Mongoose.Document) {
        if (this.isValidDocument(data)) this.document = data;
      }
      this.document = new Model.model(data);
      this.document.timestamp = new Date().toString();
    }
    /**
     * Verify if the document matches the expected created document at runtime
     * @todo Improve Verification Methods (Verify value as well)
     * @param doc The document that getting verified
     */
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
    /**
     * Converts every string that should be a number type into a number type if possible
     */
    private stringToNum() {}
    /**
     * Gets the document stored data for use
     */
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
    /**
     * Set document data
     */
    public setData(data: D): void {
      this.document = {
        ...data,
        ...this.document
      };
    }
    /**
     * Gets the document meta data for server side purpose and validations
     */
    public meta(): { timestamp: string; id: string } {
      return {
        timestamp: this.document.timestamp,
        id: this.document._id as string
      };
    }
    /**
     * Saves the document to database
     */
    public save() {
      if (isTemplate) {
        return console.log("Cannot save a template model.");
      }
      this.document.save();
      this.onSave();
      return;
    }
    /**
     * Updates the document to the database based off the id
     */
    public update() {
      if (isTemplate) return console.log("Cannot update a template model.");
      //this.document.update();
      this.onUpdate();
      return;
    }
    /**
     * Delete the document from the database based off the id
     */
    public delete() {
      if (isTemplate) return console.log("Cannot delete a template model.");
      this.document.remove();
      this.onDelete();
      return;
    }
    /**
     * Gets the id of the document
     */
    public id() {
      return this.document._id as string;
    }
    /**
     * Validates that the inputted data has the correct type
     * @override Make sure the super.validate is called and awaited before any data verification is done
     */
    public async validate() {
      inherit.forEach(async Model => await new Model(this.data()).validate());
      return this.document.validate();
    }
    /**
     * Adds a single id to the related data id container
     * @param fn Gets the id storage container for any related data
     * @param model Related data model
     * @param id Document ID for the inputted model
     */
    protected async addID(
      fn: (data: ReturnType<this["data"]>) => string[],
      model: {
        isValidID: (id: string) => Promise<boolean>;
      },
      id: string
    ) {
      const storage = fn(this.data() as ReturnType<this["data"]>);
      if (await model.isValidID(id)) storage.push(id);
    }
    /**
     * Adds multiple ids to the related data id containers.
     * @param fn Gets the id storage container for any related data
     * @param model Related data model
     * @param id Document ID for the inputted model
     */
    protected async addIDs(
      fn: (doc: ReturnType<this["data"]>) => string[],
      model: {
        getSelvesByIDs: (ids: string[]) => Promise<Model[] | null>;
      },
      ids: string[]
    ) {
      const storage = fn(this.data() as ReturnType<this["data"]>);
      const docs = await model.getSelvesByIDs(ids);
      if (docs && docs.length === ids.length) storage.push(...ids);
    }
    /**
     * Remove id from the data object
     * @param fn Gets the id storage container for any related data
     * @param id Document ID to remove
     */
    protected removeID(
      fn: (data: ReturnType<this["data"]>) => string[],
      id: string
    ) {
      const storage = fn(this.data() as ReturnType<this["data"]>);
      const index = storage.indexOf(id);
      if (index !== -1) storage.splice(index);
    }
    /**
     * Remove id from the data object
     * @param fn Gets the id storage container for any related data
     * @param ids Document IDs to remove
     */
    protected removeIDs(
      fn: (data: ReturnType<this["data"]>) => string[],
      ids: string[]
    ) {
      const storage = fn(this.data() as ReturnType<this["data"]>);
      const validIDs = ids
        .map(id => storage.indexOf(id))
        .filter(cur => cur !== -1)
        .map(index => ids[index]);
      if (validIDs.length === ids.length) storage.push(...validIDs);
    }
  }
  return Model;
}
// @ts-ignore
export default Model;

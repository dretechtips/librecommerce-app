import Mongoose, { Document, Model } from "mongoose";
import {
  ExtractSchema,
  ExtractSchemaData,
} from "src/app/common/model/Model.interface";
import {
  ExtractArrayProp,
  ExtractArrayType,
  ExtractPropsKey,
} from "../../../util/Types";

/**
 * Create service factory
 * @typedef D Data of Transfer
 * @param model Model Type
 */
export class Service<T extends Model<ExtractSchema<T> & Document>> {
  protected model: Model<ExtractSchema<T> & Document>;
  constructor(model: Model<ExtractSchema<T> & Document>) {
    this.model = model;
  }
  public async validateID(id: string): Promise<boolean> {
    try {
      await this.get(id);
      return true;
    } catch (e) {
      return false;
    }
  }
  public async validateIDs(id: string[]): Promise<boolean> {
    try {
      await this.getAll(id);
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   * @override Override this in order to add additional verification before getting saved into database such as the add, update, etc methods
   * @param dot Data Transfer Object
   */
  public async validateDOT(dot: any): Promise<boolean> {
    try {
      const doc = new this.model(dot);
      await doc.validate();
      return true;
    } catch (e) {
      return false;
    }
  }
  public async validateDOTs(dots: any[]): Promise<boolean> {
    try {
      await Promise.all(
        dots
          .map((cur) => new this.model(cur))
          .map((cur) => this.validateDOT(cur))
      );
      return true;
    } catch (e) {
      return false;
    }
  }
  public async add(dot: any): Promise<ExtractSchema<T> & Document> {
    const doc = new this.model(dot);
    await doc.validate();
    doc.save();
    return doc;
  }
  public async addAll(dots: any[]): Promise<(ExtractSchema<T> & Document)[]> {
    const docs = dots.map((dot) => new this.model(dot));
    const mapped = docs.map((doc) => doc.validate());
    await Promise.all(mapped);
    docs.forEach((doc) => doc.save());
    return docs;
  }
  public async update(id: string, dot: any): Promise<void> {
    const doc = await this.get(id);
    await this.validateDOT(dot);
    await doc.update(dot);
    await doc.save();
  }
  public async delete(id: string): Promise<void> {
    const doc = await this.get(id);
    await doc.remove();
    await doc.save();
  }
  public async get(id: string): Promise<ExtractSchema<T> & Document> {
    const doc = await this.model.findById(id);
    if (!doc) throw new Error("Invalid ID Value");
    return doc;
  }
  public async getAll(ids: string[]): Promise<(ExtractSchema<T> & Document)[]> {
    return this.model.find({
      _id: {
        $in: [ids.map((cur) => Mongoose.Types.ObjectId(cur))],
      },
    });
  }
  public async getByProp<U extends keyof ExtractSchema<T>>(
    id: string,
    prop: U
  ) {
    const doc = await this.get(id);
    return doc[prop];
  }
  public async findAll(): Promise<(ExtractSchema<T> & Document)[]> {
    return this.model.find({}).exec();
  }
  public async findAllByProp<U extends keyof ExtractSchemaData<T>>(
    key: U,
    value: ExtractSchemaData<T>[U]
  ): Promise<InstanceType<T>[]> {
    // TODO
  }
  public async findOneByQuery(query: Object) {
    return this.model.findOne(query).exec();
  }
  public async findOneByProp<U extends keyof ExtractSchemaData<T>>(
    key: U,
    value: ExtractSchemaData<T>[U]
  ): Promise<InstanceType<T>> {
    const val = await this.findAllByProp(key, value);
    if (!val[0]) throw new Error("Cannot Find One By Prop");
    return val[0];
  }
  public async findAllByArrayValue<
    U extends keyof ExtractArrayProp<ExtractSchemaData<T>>
  >(
    key: U,
    value: ExtractArrayType<ExtractArrayProp<ExtractSchemaData<T>>[U]>
  ) {
    return this.model
      .find({
        [key]: value,
      })
      .exec();
  }
  public async findAllAtDateRange<U extends ExtractPropsKey<T, Date>>(
    key: U,
    start: Date,
    end: Date
  ): Promise<(T & Document)[]> {
    return this.model.find({
      [key]: {
        $lt: end,
        $gt: start,
      },
    });
  }
  public async findAllAtNumberRange<U extends ExtractPropsKey<T, number>>(
    key: U,
    start: number,
    end: number
  ): Promise<(T & Document)[]> {
    return this.model.find({
      [key]: {
        $lt: end,
        $gt: start,
      },
    });
  }
  public async removeFromArrayProp<
    U extends keyof ExtractArrayProp<ExtractSchemaData<T>>
  >(
    id: string,
    key: U,
    value:
      | ExtractArrayType<ExtractArrayProp<ExtractSchemaData<T>>[U]>
      | ExtractArrayProp<ExtractSchemaData<T>>[U]
  ) {
    const doc = await this.get(id);
    let prop: any[] = doc[key];
    if (Array.isArray(value)) {
      (value as any[]).forEach(
        (cur) => (prop = prop.filter((cur) => cur !== value))
      );
    } else {
      prop = prop.filter((cur) => cur !== value);
    }
    await doc.save();
  }
  public async forEachArrayProp<
    U extends keyof ExtractArrayProp<ExtractSchemaData<T>>
  >(
    id: string,
    fn: (key: U, value: ExtractArrayProp<ExtractSchemaData<T>>[U]) => void
  ) {
    const doc = await this.get(id);
    Object.keys(doc).forEach((key) => {
      if (!this.model.schema[key] && !Array.isArray(doc[key])) return;
      const value: ExtractSchema<T>[U] = doc[key];
      fn(key as U, value);
    });
  }
}

export default Service;

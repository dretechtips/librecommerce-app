import { Model } from "mongoose";
import { ExtractData } from "src/app/common/model/Model.interface";
import { IDOnly, ExtractArrayType, ExtractPropsKey } from "../../../util/Types";
import Mongoose from "mongoose";
import { Typegoose } from "typegoose";
import { Document } from "mongoose";
import { ExtractKeyOfArrayProp } from "src/util/Types";
import { Types } from "mongoose";

/**
 * Create service factory
 * @typedef D Data of Transfer
 * @param model Model Type
 */
export class Service<T> {
  private model: Model<T & Document>;
  constructor(model: Model<T & Document>) {
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
        dots.map(cur => new this.model(cur)).map(cur => cur.validate())
      );
      return true;
    } catch (e) {
      return false;
    }
  }
  public async add(dot: any): Promise<T & Document> {
    const doc = new this.model(dot);
    await doc.validate();
    doc.save();
    return doc;
  }
  public async addAll(dots: any[]): Promise<(T & Document)[]> {
    const docs = dots.map(dot => new this.model(dot));
    const mapped = docs.map(doc => doc.validate());
    await Promise.all(mapped);
    docs.forEach(doc => doc.save());
    return docs;
  }
  public async update(id: string, dot: any): Promise<void> {
    const doc = await this.get(id);
    await this.validateDOT(dot);
    await doc.update(dot);
    await doc.save();
  }
  public async get(id: string): Promise<T & Document> {
    const doc = await this.model.findById(id);
    if (!doc) throw new Error("Invalid ID Value");
    return doc;
  }
  public async getAll(ids: string[]): Promise<(T & Document)[]> {
    return this.model.find({
      _id: {
        $in: [ids.map(cur => Mongoose.Types.ObjectId(cur))]
      }
    });
  }
  public async findAllByArrayValue<U extends ExtractKeyOfArrayProp<T>>(
    key: U,
    value: ExtractArrayType<T[U]>
  ) {
    return this.model
      .find({
        [key]: value
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
        $gt: start
      }
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
        $gt: start
      }
    });
  }
}

export default Service;

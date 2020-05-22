import { Document } from "mongoose";
import { Model } from "mongoose";
import Service from "../service/Service.factory";


export function InjectModel<T extends Model<Document>>(model: T) {
  return function (target: Object, key: string | symbol, index: number) {
    target[key] = new model();
  }
}

export function InjectModelByProp<T extends Model<Document>>(model: T) {
  return function(target: Object, key: string | symbol) {
    target[key] = new model();
  }
}


import { Document } from "mongoose";
import { Model } from "mongoose";
import Service from "../service/Service.factory";

export function InjectModel<T extends Model<Document>>(model: T) {
  return function<U extends { new(...args: any[]): Service<any>  }>(ctor: U) {
    class extended extends ctor {
      constructor(...args: any[]) {
        super();
        this.model = model;
      }
    }

    return extended;
  }
}
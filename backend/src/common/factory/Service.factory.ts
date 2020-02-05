import Model from "./Model.factory";
import { ExtractData } from "src/common/interface/Model.interface";
import { IDOnly } from "../../util/Types";

/**
 * Create service factory
 * @typedef D Data of Transfer
 * @param model Model Type
 */
export function ServiceFactory<
  T extends ReturnType<typeof Model>,
  D extends InstanceType<T>
>(model: T) {
  return class Service {
    public async add(dot: ExtractData<T>): Promise<D> {
      const doc = new model(dot);
      await doc.validate();
      doc.save();
      return doc as D;
    }
    public async addAll(dots: ExtractData<T>[]): Promise<D[]> {
      const docs = dots.map(dot => new model(dot));
      const mapped = docs.map(doc => doc.validate());
      await Promise.all(mapped);
      return docs as D[];
    }
    public async update(dot: ExtractData<T> & IDOnly): Promise<void> {
      const doc = await this.get(dot.id);
      doc.setData({
        ...doc.data(),
        ...dot
      });
    }
    public async get(id: string): Promise<D> {
      const doc = await model.getSelfByID(id);
      if (!doc) throw new Error("Invalid ID Value");
      return doc as D;
    }
  };
}

export default ServiceFactory;

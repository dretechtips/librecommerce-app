import Model from "./Model.factory";
import { IDOnly } from "./Types";

/**
 * Create service factory
 * @typedef D Data of Transfer
 * @param model Model Type
 */
export function ServiceFactory<D>(model: ReturnType<typeof Model>) {
  return class Service {
    public async add(dot: D) {
      const doc = new model(dot);
      await doc.validate();
      doc.save();
      return doc;
    }
    public async addAll(dots: D[]) {
      const docs = dots.map(dot => new model(dot));
      await Promise.all(docs.map(doc => doc.validate()));
      return docs.map(doc => doc.id());
    }
    public async update(dot: D & IDOnly): Promise<void> {
      const { id } = dot;
      const doc = await model.getSelfByID(id);
      if (!doc) throw new Error("Invalid ID value.");
      doc.setData({
        ...doc.data(),
        ...dot
      });
    }
  };
}

export default ServiceFactory;

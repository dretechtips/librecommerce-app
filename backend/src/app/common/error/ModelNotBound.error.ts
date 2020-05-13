import Service from "../service/Service.factory";

export default class extends Error {
  constructor(service: Service<any>) {
    super();
    this.name = "ModelNotBound";
    this.message = service.constructor.name + " Error: Model not bounded properly! Please make sure the model is injected properly";
  }
}
import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { Model } from "mongoose";
import Service from "src/app/common/service/Service.factory";
import { IDsOnly } from "../../../util/Types";
import { Document } from "mongoose";

export function ValidationPipeFactory<T extends Service<any>>(Service: {
  new (...arg: any): T;
}) {
  return class Pipe implements PipeTransform {
    constructor(private readonly service: InstanceType<typeof Service>) {}
    public async transform(value: any, meta: ArgumentMetadata) {
      await this.service.validateDOT(value);
      return value;
    }
  };
}

export function IDValidationPipeFactory<T extends Service<any>>(Service: {
  new (...arg: any): T;
}) {
  return class Pipe implements PipeTransform {
    constructor(private readonly service: T) {}
    public async transform(value: any, meta: ArgumentMetadata) {
      if (typeof value === "string") {
        const { id } = await this.transform({ id: value }, meta);
        return id;
      }
      const { id } = value;
      if (typeof id !== "string")
        throw new TypeError(
          "Invalid ID type was passed into the body id validation pipeline."
        );
      if (!(await this.service.validateDOT(id)))
        throw new Error(
          "Invalid ID was passed into the body id validation pipeline."
        );
      return value;
    }
  };
}
/**
 * @return IDsOnly
 * @param model Model Type
 */
export function IDsValidationPipeFactory<T extends Service<any>>(Service: {
  new (...arg: any): T;
}) {
  return class Pipe implements PipeTransform<any, Promise<IDsOnly>> {
    constructor(private readonly service: InstanceType<typeof Service>) {}
    public async transform(value: any, meta: ArgumentMetadata) {
      if (Array.isArray(value)) {
        const { ids } = await this.transform({ ids: value }, meta);
        return ids;
      }
      const { ids } = value;
      if (Array.isArray(ids)) {
        if (ids.filter(cur => !(cur instanceof String)).length == 0) {
          if (!(await this.service.validateIDs(ids as string[]))) {
            return value as IDsOnly;
          }
          throw new Error("Make sure that every IDs passed in is a valid ID");
        }
        throw new TypeError("Make sure every IDs passed in is a string");
      }
      throw new TypeError("Make sure the IDs passed in is an array.");
    }
  };
}

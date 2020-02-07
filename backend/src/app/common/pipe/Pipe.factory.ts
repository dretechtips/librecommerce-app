import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
import Model from "src/app/common/factory/Model.factory";
import { IDsOnly } from "../../../util/Types";

export function ValidationPipeFactory(model: ReturnType<typeof Model>) {
  return class Pipe implements PipeTransform {
    public async transform(value: any, meta: ArgumentMetadata) {
      const doc = new model(value);
      await doc.validate();
      return value;
    }
  };
}

export function IDValidationPipeFactory(model: ReturnType<typeof Model>) {
  return class Pipe implements PipeTransform {
    public async transform(value: any, meta: ArgumentMetadata) {
      const { id } = value;
      if (typeof id !== "string")
        throw new TypeError(
          "Invalid ID type was passed into the body id validation pipeline."
        );
      if (!model.isValidID(id))
        throw new Error(
          "Invalid ID was passed into the body id validation pipeline."
        );
    }
  };
}
/**
 * @return IDsOnly
 * @param model Model Type
 */
export function IDsValidationPipeFactory(model: ReturnType<typeof Model>) {
  return class Pipe implements PipeTransform<any, Promise<IDsOnly>> {
    public async transform(
      value: any,
      meta: ArgumentMetadata
    ): Promise<IDsOnly> {
      const { ids } = value;
      if (Array.isArray(ids)) {
        if (ids.filter(cur => !(cur instanceof String)).length == 0) {
          if ((await model.getSelvesByIDs(ids as string[])) !== null) {
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

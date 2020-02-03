import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
import Model from "src/util/Model.factory";

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

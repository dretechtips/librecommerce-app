import {
  ValidationPipeFactory,
  IDsValidationPipeFactory
} from "src/common/factory/Pipe.factory";
import { Alert } from "./Alert.model";
import { ArgumentMetadata } from "@nestjs/common";
import { AlertDOT, AlertType } from "./Alert.interface";

export class ValidateAlertFromAdmin extends ValidationPipeFactory(Alert) {
  public async transform(value: any, meta: ArgumentMetadata) {
    ((value as AlertDOT).type as AlertType) = AlertType.ADMIN;
    return super.transform(value, meta);
  }
}

export class ValidateAlertID extends IDsValidationPipeFactory(Alert) {}

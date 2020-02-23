import { ArgumentMetadata, Injectable } from "@nestjs/common";
import {
  IDsValidationPipeFactory,
  ValidationPipeFactory
} from "src/app/common/pipe/Pipe.factory";
import { AlertDOT, AlertType } from "./Alert.interface";
import AlertService from "./Alert.service";

@Injectable()
export class ValidateAlertFromAdmin extends ValidationPipeFactory(
  AlertService
) {
  public async transform(value: any, meta: ArgumentMetadata) {
    ((value as AlertDOT).type as AlertType) = AlertType.ADMIN;
    return super.transform(value, meta);
  }
}

@Injectable()
export class ValidateAlertID extends IDsValidationPipeFactory(AlertService) {}

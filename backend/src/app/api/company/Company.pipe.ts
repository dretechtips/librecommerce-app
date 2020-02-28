import { ArgumentMetadata, Injectable } from "@nestjs/common";
import {
  IDValidationPipeFactory,
  ValidationPipeFactory
} from "src/app/common/pipe/Pipe.factory";
import CompanyService from "./Company.service";

@Injectable()
export class ValidateCompanyIDPipe extends IDValidationPipeFactory(
  CompanyService
) {
  public transform(value: any, meta: ArgumentMetadata) {
    if (value === "self") {
      return value;
    }
    return super.transform(value, meta);
  }
}

@Injectable()
export class ValidateCompanyPipe extends ValidationPipeFactory(
  CompanyService
) {}

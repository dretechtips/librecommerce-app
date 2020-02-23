import {
  IDValidationPipeFactory,
  ValidationPipeFactory
} from "src/app/common/pipe/Pipe.factory";
import AppealService from "./Appeal.service";

export class ValidateAppealPipe extends ValidationPipeFactory(AppealService) {}

export class ValidateAppealIDPipe extends IDValidationPipeFactory(
  AppealService
) {}

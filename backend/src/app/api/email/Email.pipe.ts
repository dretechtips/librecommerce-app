import { IDValidationPipeFactory } from "src/app/common/pipe/Pipe.factory";
import EmailService from "./Email.service";

export class ValidateEmailIDPipe extends IDValidationPipeFactory(
  EmailService
) {}

import { IDValidationPipeFactory } from "src/app/common/pipe/Pipe.factory";
import { BillingService } from "./Billing.service";

export class ValidateBillingIDPipe extends IDValidationPipeFactory(
  BillingService
) {}

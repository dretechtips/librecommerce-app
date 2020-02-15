import { IDValidationPipeFactory } from "src/app/common/pipe/Pipe.factory";
import { BillingService } from "./Billing.service";
import AccountService from "../account/Account.service";

export class ValidateBillingIDPipe extends IDValidationPipeFactory(
  BillingService
) {}

import { IDValidationPipeFactory } from "src/app/common/pipe/Pipe.factory";
import SubscriptionService from "./Subscription.service";

export class ValidateSubscriptionIDPipe extends IDValidationPipeFactory(
  SubscriptionService
) {}

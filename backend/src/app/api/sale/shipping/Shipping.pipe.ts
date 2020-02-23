import {
  IDValidationPipeFactory,
  ValidationPipeFactory
} from "src/app/common/pipe/Pipe.factory";
import ShippingService from "./Shipping.service";

export class ValidateShippingPipe extends ValidationPipeFactory(
  ShippingService
) {}

export class ValidateShippingIDPipe extends IDValidationPipeFactory(
  ShippingService
) {}

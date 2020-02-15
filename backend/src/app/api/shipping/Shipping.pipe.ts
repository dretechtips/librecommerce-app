import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
import Shipping from "./Shipping.model";
import {
  ValidationPipeFactory,
  IDValidationPipeFactory
} from "src/app/common/pipe/Pipe.factory";
import ShippingService from "./Shipping.service";

export class ShippingValidationPipe extends ValidationPipeFactory(
  ShippingService
) {}

export class ShippingIDValidationPipe extends IDValidationPipeFactory(
  ShippingService
) {}

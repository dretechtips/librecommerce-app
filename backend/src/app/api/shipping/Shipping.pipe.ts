import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
import Shipping from "./Shipping.model";
import {
  ValidationPipeFactory,
  IDValidationPipeFactory
} from "src/app/common/pipe/Pipe.factory";

export class ShippingValidationPipe extends ValidationPipeFactory(Shipping) {}

export class ShippingIDValidationPipe extends IDValidationPipeFactory(
  Shipping
) {}

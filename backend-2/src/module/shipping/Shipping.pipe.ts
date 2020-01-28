import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
import Shipping from "src/model/Shipping";
import {
  ValidationPipeFactory,
  IDValidationPipeFactory
} from "../util/Pipe.factory";

export class ShippingValidationPipe extends ValidationPipeFactory(Shipping) {}

export class ShippingIDValidationPipe extends IDValidationPipeFactory(
  Shipping
) {}

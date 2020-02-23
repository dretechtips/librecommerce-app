import { Injectable } from "@nestjs/common";
import {
  IDValidationPipeFactory,
  ValidationPipeFactory
} from "src/app/common/pipe/Pipe.factory";
import OrderService from "./Order.service";

@Injectable()
export class ValidateOrderPipe extends ValidationPipeFactory(OrderService) {}

@Injectable()
export class ValidateOrderIDPipe extends IDValidationPipeFactory(
  OrderService
) {}

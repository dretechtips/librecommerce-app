import { Injectable } from "@nestjs/common";
import {
  IDValidationPipeFactory,
  ValidationPipeFactory
} from "src/app/common/pipe/Pipe.factory";
import CustomerService from "./Customer.service";

@Injectable()
export class ValidateCustomerIDPipe extends IDValidationPipeFactory(
  CustomerService
) {}

@Injectable()
export class ValidateCustomerPipe extends ValidationPipeFactory(
  CustomerService
) {}

import { IDValidationPipeFactory } from "src/app/common/pipe/Pipe.factory";
import Customer from "./Customer.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerIDValidationPipe extends IDValidationPipeFactory(
  Customer
) {}

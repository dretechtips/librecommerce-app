import { IDValidationPipeFactory } from "src/app/common/pipe/Pipe.factory";
import Customer from "./Customer.model";

export class CustomerIDValidationPipe extends IDValidationPipeFactory(
  Customer
) {}

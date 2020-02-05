import { IDValidationPipeFactory } from "src/common/factory/Pipe.factory";
import Customer from "./Customer.model";

export class CustomerIDValidationPipe extends IDValidationPipeFactory(
  Customer
) {}

import { IDValidationPipeFactory } from "src/util/Pipe.factory";
import Customer from "./Customer.model";

export class CustomerIDValidationPipe extends IDValidationPipeFactory(Customer) {}
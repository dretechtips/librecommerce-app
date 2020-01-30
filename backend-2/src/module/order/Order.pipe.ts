import { ValidationPipeFactory } from "src/util/Pipe.factory";
import Order from "./Order.model";

export class OrderValidationPipe extends ValidationPipeFactory(Order) {}

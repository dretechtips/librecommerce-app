import { ValidationPipeFactory } from "src/app/common/factory/Pipe.factory";
import Order from "./Order.model";

export class OrderValidationPipe extends ValidationPipeFactory(Order) {}

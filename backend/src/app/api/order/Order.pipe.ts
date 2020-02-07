import { ValidationPipeFactory } from "src/app/common/pipe/Pipe.factory";
import Order from "./Order.model";

export class OrderValidationPipe extends ValidationPipeFactory(Order) {}

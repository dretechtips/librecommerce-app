import {
  IDValidationPipeFactory,
  ValidationPipeFactory
} from "src/app/common/pipe/Pipe.factory";
import CartService from "./Cart.service";

export class ValidateCartPipe extends ValidationPipeFactory(CartService) {}

export class ValidateCartIDPipe extends IDValidationPipeFactory(CartService) {}

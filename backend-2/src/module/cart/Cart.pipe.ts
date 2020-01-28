import {
  ValidationPipeFactory,
  IDValidationPipeFactory
} from "src/util/Pipe.factory";
import Cart from "src/module/cart/Cart.model";
import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { CartItemDOT } from "./Cart.interface";

export class CartValidationPipe extends ValidationPipeFactory(Cart) {}

export class CartItemValidationPipe implements PipeTransform {
  public transform(value: any, meta: ArgumentMetadata) {
    const expect = value as CartItemDOT;
    if (typeof expect.id === "string" && typeof expect.amount === "number") {
      return value;
    }
    throw new Error("Invalid Cart Item");
  }
}

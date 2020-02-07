import { NestMiddleware, Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { prefix } from "./Cart.controller";
import Cart from "./Cart.model";
import { CartDOT } from "./Cart.interface";
import { ValidateCookieIDMiddleware } from "src/app/common/middleware/Middleware.factory";
import CartService from "./Cart.service";

@Injectable()
export class CustomerCartTrackerMidddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: Function) {
    if (!req.cookies[prefix]) {
      this.create(res);
      return next();
    }
    this.verify(req);
    return next();
  }
  private create(res: Response) {
    const cartdot: CartDOT = {
      products: []
    };
    const cart = new Cart(cartdot);
    cart.save();
    res.cookie(prefix, cart.id());
  }
  private verify(req: Request) {
    if (typeof req.cookies[prefix] !== "string")
      throw new Error("Invalid " + prefix + " cookie ID type");
    if (!Cart.isValidID(req.cookies[prefix]))
      throw new Error("Invalid " + prefix + " cookie ID");
  }
}

@Injectable()
export class ValidateCartIDMiddleware extends ValidateCookieIDMiddleware(
  prefix,
  Cart
) {
  constructor(private cart: CartService) {
    super();
  }
}

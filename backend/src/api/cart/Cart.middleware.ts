import { NestMiddleware, Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { prefix } from "../controller/Cart.controller";
import Cart from "src/model/Cart";
import { CartDOT } from "src/interface/Cart.interface";
import { ValidateCookieIDMiddleware } from "src/util/Middleware.factory";
import CartService from "src/service/Cart.service";

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

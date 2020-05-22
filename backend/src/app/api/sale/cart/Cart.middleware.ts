import { Injectable, NestMiddleware, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Request, Response } from "express";
import LoginService from "../../account/user/login/Login.service";
import { AccountType } from "../../account/type/Type.interface";
import { prefix } from "./Cart.controller";
import { CartDOT } from "./Cart.interface";
import Cart from "./Cart.model";
import CartService from "./Cart.service";

@Injectable()
export class CartTrackerMiddleware implements NestMiddleware, OnModuleInit {
  private login: LoginService;
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly cart: CartService
  ) {}
  public onModuleInit() {
    this.login = this.moduleRef.get(LoginService, { strict: false });
  }
  public async use(req: Request, res: Response, next: Function) {
    if ((await this.login.getOwnAccountType(req)) === AccountType.CUSTOMER) {
      if (!req.cookies[prefix]) {
        this.create(res);
        return next();
      }
      await this.verify(req);
      return next();
    }
    return next();
  }
  private create(res: Response) {
    const cartdot: CartDOT = {
      productIDs: []
    };
    const cart = new Cart(cartdot);
    cart.save();
    res.cookie(prefix, cart.id());
  }
  private async verify(req: Request) {
    if (typeof req.cookies[prefix] !== "string")
      throw new Error("Invalid " + prefix + " cookie ID type");
    if (!(await this.cart.validateID(req.cookies[prefix])))
      throw new Error("Invalid " + prefix + " cookie ID");
  }
}

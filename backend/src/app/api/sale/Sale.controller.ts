import { Request, Response } from "express";
import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Ip,
  Req,
  Res
} from "@nestjs/common";
import path from "path";
import { SaleService } from "./Sale.service";
import { GetOrderFromBody } from "../order/Order.decorator";
import { OrderDOT } from "../order/Order.interface";
import { IDOnly } from "src/util/Types";
import {
  GetCustomerIDFromBody,
  GetCustomerIDFromCookie
} from "../account/customer/Customer.decorator";
import { GetCartFromBody, GetCartIDFromCookie } from "../cart/Cart.decorator";
import { CartDOT } from "../cart/Cart.interface";
import { GetShippingFromBody } from "../shipping/Shipping.decorator";
import { ShippingDOT } from "../shipping/Shipping.interface";
import Cart from "../cart/Cart.model";
import { RestrictAccount, GetAccountType } from "../account/Account.decorator";
import AccountService from "../account/Account.service";
import { AccountType } from "../account/Account.interface";
import { Sale } from "./Sale.model";
import { SaleDOT } from "./Sale.interface";

@Controller("sale")
export class SaleController {
  constructor(
    private readonly sale: SaleService,
    private readonly account: AccountService
  ) {}
  @Post("create")
  public async create(
    @Req() req: Request,
    @Res() res: Response,
    @GetAccountType() accountType: AccountType
  ) {
    switch (accountType) {
      case "admin":
        res.redirect(307, path.join(req.path, "admin"));
      case "customer":
        res.redirect(307, path.join(req.path, "customer"));
    }
  }
  @Post("create/admin")
  @RestrictAccount("admin")
  public async createByAdmin(
    @Ip() ip: string,
    @GetOrderFromBody() orderDOT: OrderDOT,
    @GetCustomerIDFromBody() customerIdDOT: IDOnly,
    @GetCartFromBody() cartDOT: CartDOT,
    @GetShippingFromBody() shippingDOT: ShippingDOT
  ): Promise<SaleDOT> {
    return (
      await this.sale.create(
        ip,
        customerIdDOT.id,
        orderDOT,
        shippingDOT,
        cartDOT
      )
    ).data();
  }
  @Post("create/customer")
  @RestrictAccount("customer")
  public async createByCustomer(
    @Ip() ip: string,
    @GetOrderFromBody() orderDOT: OrderDOT,
    @GetShippingFromBody() shippingDOT: ShippingDOT,
    @GetCustomerIDFromCookie() customerID: string,
    @GetCartIDFromCookie() cartID: string
  ): Promise<SaleDOT> {
    const cart = ((await Cart.getSelfByID(cartID)) as Cart) || null;
    if (!cart)
      throw new Error(
        "Cart ID was validated, however database cannot find it."
      );
    return (
      await this.sale.create(ip, customerID, orderDOT, shippingDOT, cart.data())
    ).data();
  }
  @Patch("pay")
  public async pay(
    saleIdDOT: IDOnly,
    paymentMethodIdDOT: IDOnly
  ): Promise<void> {
    await this.sale.pay(saleIdDOT.id, paymentMethodIdDOT.id);
  }
}

export default SaleController;

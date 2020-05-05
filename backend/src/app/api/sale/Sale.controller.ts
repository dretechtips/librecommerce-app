import { Controller, Get, Param, Patch, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import path from "path";
import { IDOnly } from "src/util/Types";
import {
  AccessLoginAccountType,
  RestrictAccess
} from "../account/util/login/Login.decorator";
import {
  GetCustomerIDFromBody,
  GetCustomerIDFromCookie
} from "../account/customer/Customer.decorator";
import { AccountType } from "../account/type/Type.interface";
import { GetCartFromBody, GetCartIDFromCookie } from "./cart/Cart.decorator";
import { CartDOT } from "./cart/Cart.interface";
import { GetOrderFromBody } from "./order/Order.decorator";
import { OrderDOT } from "./order/Order.interface";
import { ValidateSaleIDPipe } from "./Sale.pipe";
import { SaleService } from "./Sale.service";
import { GetShippingFromBody } from "./shipping/Shipping.decorator";
import { ShippingDOT } from "./shipping/Shipping.interface";

export const prefix = "sale";

@Controller(prefix)
@RestrictAccess(AccountType.EMPLOYEE, AccountType.COMPANY, AccountType.STORE)
export class SaleController {
  constructor(private readonly sale: SaleService) {}
  @Post("create")
  public async create(
    @Req() req: Request,
    @Res() res: Response,
    @AccessLoginAccountType() account: AccountType
  ) {
    switch (account) {
      case AccountType.EMPLOYEE:
        res.redirect(307, path.join(req.path, "admin"));
      case AccountType.CUSTOMER:
        res.redirect(307, path.join(req.path, "customer"));
    }
  }
  @Post("create/admin")
  public async createByAdmin(
    @Res() res: Response,
    @GetOrderFromBody() orderDOT: OrderDOT,
    @GetCustomerIDFromBody() customerID: string,
    @GetCartFromBody() cartDOT: CartDOT,
    @GetShippingFromBody() shippingDOT: ShippingDOT
  ) {
    return (
      await this.sale.authorize(res, customerID, orderDOT, shippingDOT, cartDOT)
    ).toJSON();
  }
  @Post("create/customer")
  @RestrictAccess(AccountType.CUSTOMER)
  public async createByCustomer(
    @Res() res: Response,
    @GetOrderFromBody() orderDOT: OrderDOT,
    @GetShippingFromBody() shippingDOT: ShippingDOT,
    @GetCustomerIDFromCookie() customerID: string,
    @GetCartIDFromCookie() cartID: string
  ) {
    return (
      await this.sale.authorize(res, customerID, orderDOT, shippingDOT, cartID)
    ).toJSON();
  }
  @Patch("pay")
  public async pay(
    saleIdDOT: IDOnly,
    paymentMethodIdDOT: IDOnly
  ): Promise<void> {
    await this.sale.process(saleIdDOT.id, paymentMethodIdDOT.id);
  }
  @Patch("cancel/:saleID")
  public async cancel(@Param("saleID", ValidateSaleIDPipe) saleID: string) {
    await this.sale.cancel(saleID);
  }
  @Get("fetch/:saleID")
  public async fetch(@Param("saleID", ValidateSaleIDPipe) saleID: string) {
    return (await this.sale.get(saleID)).toJSON();
  }
}

export default SaleController;

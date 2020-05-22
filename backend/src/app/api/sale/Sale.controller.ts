import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Body,
  Optional,
  Res,
} from "@nestjs/common";
import { Request, Response } from "express";
import { RestrictAccess, LoginID } from "../account/user/login/Login.decorator";
import { SaleService } from "./Sale.service";
import { SaleDOT } from "./Sale.interface";
import ExternalCompany from "../account/company/external_company/ExternalCompany.model";
import ExternalUser from "../account/user/external_user/ExternalUser.model";
import ExternalStore from "../account/store/external_store/ExternalStore.model";
import InternalUser from "../account/user/internal_user/InternalUser.model";
import InternalStore from "../account/store/internal_store/InternalStore.model";
import User from "../account/user/User.model";
import Store from "../account/store/Store.model";
import Company from "../account/company/Company.model";
import { prefix as pReviewPrefix } from "./product/product_review/ProductReview.controller";
import { ProductReviewDOT } from "./product/product_review/ProductReview.interface";
import { prefix as cartPrefix } from "./cart/Cart.controller";
import { CartDOT } from "./cart/Cart.interface";
import { prefix as orderPrefix } from "./order/Order.controller";
import { OrderDOT } from "./order/Order.interface";
import { prefix as shippingPrefix } from "./shipping/Shipping.controller";
import { ShippingDOT } from "./shipping/Shipping.interface";
import { prefix as promoPrefix } from "./promo/Promo.controller";
import { prefix as accountPrefix } from "src/app/api/account/Account.controller";

export const prefix = "sale";

@Controller(prefix)
export class SaleController {
  constructor(private readonly sale: SaleService) {}

  @Get("fetch/:id")
  public async fetch(@Param("id") saleID: string): Promise<any> {
    return (await this.sale.get(saleID)).toJSON();
  }

  @Patch("update/:id")
  public async update(
    @Param("id") saleID: string,
    @Body(prefix) sale: SaleDOT
  ) {
    (await this.sale.update(saleID, sale)).toJSON();
  }

  @Get("request/form")
  public requestForm() {
    // TODO
  }

  @Post("request")
  @RestrictAccess(ExternalCompany, ExternalUser, ExternalStore)
  public async request(
    @Res() res: Response,
    @LoginID() loginID: string,
    @Body(cartPrefix) cart: CartDOT,
    @Body(orderPrefix) order: OrderDOT,
    @Body(shippingPrefix) shipping: ShippingDOT,
    @Body(promoPrefix) promoCodes: string[]
  ) {
    return (
      await this.sale.request(res, loginID, order, shipping, promoCodes, cart)
    ).toJSON();
  }

  @Patch("process/:id/:pIndex")
  @RestrictAccess(InternalUser, InternalUser, InternalStore)
  public async process(
    @Param("id") id: string,
    @Param("pIndex") pIndex?: number
  ) {
    await this.sale.process(id, pIndex);
  }

  @Patch("cancel/:id")
  @RestrictAccess(User, Store, Company)
  public async cancel(@Param("id") id: string) {
    await this.sale.cancel(id);
  }

  @Post("review/:id/:productID")
  @RestrictAccess(ExternalCompany, ExternalUser, ExternalStore)
  public review(
    @Param("id") id: string,
    @Body(pReviewPrefix /** Pipeline */) review: ProductReviewDOT
  ) {
    return this.sale.review(id, review);
  }

  @Post("request/return/:id")
  @RestrictAccess(ExternalCompany, ExternalUser, ExternalStore)
  public async requestReturn(@Param("id") id: string) {
    return await this.sale.requestReturn(id);
  }

  @Patch("verify/return/:id/:status")
  @RestrictAccess(InternalUser)
  public async verifyReturn(
    @Param("id") id: string,
    @Param("status") status: boolean
  ) {
    return await this.sale.verifyReturn(id, status);
  }

  @Patch("void/:id")
  @RestrictAccess(ExternalCompany, ExternalUser, ExternalStore)
  public async void(@Param("id") saleID: string) {
    await this.sale.void(saleID);
  }
}

export default SaleController;

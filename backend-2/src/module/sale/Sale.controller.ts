import { Controller, Post, Body, Patch, Get, Ip, Req } from "@nestjs/common";
import { Request } from "express";
import { SaleService } from "./Sale.service";
import { GetOrderFromBody } from "../order/Order.decorator";
import { OrderDOT } from "../order/Order.interface";
import { IDOnly } from "src/util/Types";
import { ValidateCustomerIDFromBody } from "../account/customer/Customer.decorator";
import { GetCartFromBody } from "../cart/Cart.decorator";
import { CartDOT } from "../cart/Cart.interface";
import { GetShippingFromBody } from "../shipping/Shipping.decorator";
import { ShippingDOT } from "../shipping/Shipping.interface";
import Customer from "../account/customer/Customer.model";
import { TransactionDOT } from "../transaction/Transaction.interface";
import Cart from "../cart/Cart.model";
import Shipping from "../shipping/Shipping.model";

@Controller("sale")
class SaleController {
  constructor(private readonly sale: SaleService) {}
  @Post("create")
  public async create(
    @Req() req: Request,
    @GetOrderFromBody() orderDOT: OrderDOT,
    @ValidateCustomerIDFromBody() customerIdDOT: IDOnly,
    @GetCartFromBody() cartDOT: CartDOT,
    @GetShippingFromBody() shippingDOT: ShippingDOT
  ) {
    const sale = this.sale;
    const customerDOC = await Customer.getSelfByID(customerIdDOT.id);
    if (!customerDOC) throw new Error("Invalid Customer ID");
    const cart = (await sale.cart.add(cartDOT)) as Cart;
    const customer = await sale.customer.add(customerDOC.data());
    const order = await sale.order.add(orderDOT);
    const shipping = (await sale.shipping.add(shippingDOT)) as Shipping;
    const transaction = sale.transaction.addUnprocessed(req, shipping, cart);
    return transaction;
  }
  @Patch("pay")
  public async pay() {}
}

export default SaleController;

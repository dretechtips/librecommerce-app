import { Controller, Post, Body, Patch, Get, Ip } from "@nestjs/common";
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

@Controller("sale")
class SaleController {
  constructor(private readonly sale: SaleService) {}
  @Post("create")
  public async create(
    @Ip() ip: string,
    @GetOrderFromBody() orderDOT: OrderDOT,
    @ValidateCustomerIDFromBody() customerIdDOT: IDOnly,
    @GetCartFromBody() cartDOT: CartDOT,
    @GetShippingFromBody() shippingDOT: ShippingDOT
  ) {
    const sale = this.sale;
    const cDoc = await Customer.getSelfByID(customerIdDOT.id);
    const cart = await sale.cart.add(cartDOT);
    const customer = await sale.customer.add(cDoc.data());
    const order = await sale.order.add(orderDOT);
    const shipping = await sale.shipping.add(shippingDOT);
    const transaction = sale.transaction.add({
      ipAddress: ip,
      amountPayed: 0
    });
    return transaction;
  }
  @Patch("pay")
  public async pay() {}
}

export default SaleController;

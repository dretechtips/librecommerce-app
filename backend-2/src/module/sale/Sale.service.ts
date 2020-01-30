import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { SaleDOT } from "./Sale.interface";
import Order from "../order/Order.model";
import CustomerService from "../account/customer/Customer.service";
import OrderService from "../order/Order.service";
import CartService from "../cart/Cart.service";
import ShippingService from "../shipping/Shipping.service";
import TransactionService from "../transaction/Transaction.service";
import { IDOnly } from "src/util/Types";
import { ShippingDOT } from "../shipping/Shipping.interface";
import { OrderDOT } from "../order/Order.interface";
import { CartDOT } from "../cart/Cart.interface";
import ServiceFactory from "src/util/Service.factory";
import { Sale } from "./Sale.model";
import Customer from "../account/customer/Customer.model";
import Shipping from "../shipping/Shipping.model";
import Cart from "../cart/Cart.model";

@Injectable()
export class SaleService extends ServiceFactory<SaleDOT>(Sale) {
  constructor(
    public readonly customer: CustomerService,
    public readonly order: OrderService,
    public readonly cart: CartService,
    public readonly shipping: ShippingService,
    public readonly transaction: TransactionService
  ) {
    super();
  }
  public async create(
    req: Request,
    customerDOT: IDOnly,
    orderDOT: OrderDOT,
    shippingDOT: ShippingDOT,
    cartDOT: CartDOT
  ): Promise<Sale> {
    const customer = await this.customer.add(
      await (await Customer.getSelfByID(customerDOT.id)).data()
    );
    const order = (await this.order.add(orderDOT)) as Order;
    const shipping = (await this.shipping.add(shippingDOT)) as Shipping;
    const cart = (await this.cart.add(cartDOT)) as Cart;
    const transaction = await this.transaction.addUnprocessed(
      req,
      cart,
      shipping
    );
    const saleDOT: SaleDOT = {
      cartID: cart.id(),
      shippingID: shipping.id(),
      customerID: customer.id(),
      orderID: shipping.id(),
      transactionID: transaction.id()
    };
    return new Sale(saleDOT);
  }
  public async pay(transaction: ) {
    
  }
}

export default SaleService;

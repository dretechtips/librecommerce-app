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
import ServiceFactory from "src/common/factory/Service.factory";
import { Sale } from "./Sale.model";
import Customer from "../account/customer/Customer.model";
import PaymentsService from "../transaction/payments/Payments.service";
import AccountService from "../account/Account.service";

@Injectable()
export class SaleService extends ServiceFactory(Sale) {
  constructor(
    private readonly customer: CustomerService,
    private readonly account: AccountService,
    private readonly order: OrderService,
    private readonly cart: CartService,
    private readonly shipping: ShippingService,
    private readonly transaction: TransactionService,
    private readonly payment: PaymentsService
  ) {
    super();
  }
  public async create(
    ip: string,
    customerID: string,
    orderDOT: OrderDOT,
    shippingDOT: ShippingDOT,
    cartDOT: CartDOT
  ): Promise<Sale> {
    const customerDOC = (await Customer.getSelfByID(
      customerID
    )) as Customer | null;
    if (!customerDOC) throw new Error("Invalid Customer ID");
    const customer = await this.customer.add(await customerDOC.data());
    const order = await this.order.add(orderDOT);
    const shipping = await this.shipping.add(shippingDOT);
    const cart = await this.cart.add(cartDOT);
    const transaction = await this.transaction.addUnprocessed(
      ip,
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
  public async pay(saleID: string, paymentID: string): Promise<void> {
    const sale = await Sale.getSelfByID(saleID);
    if (!sale) throw new Error("Invalid Sale ID");
    const customer = await this.customer.get(sale.data().cartID);
    const account = await this.account.get(customer.data().accountID);
    await this.transaction.capture(
      customer,
      paymentID,
      sale.data().transactionID
    );
  }
}

export default SaleService;

import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Response } from "express";
import Service from "src/app/common/service/Service.factory";
import CustomerService from "../account/type/customer/Customer.service";
import { TransactionType } from "../billing/transaction/Transaction.interface";
import TransactionService from "../billing/transaction/Transaction.service";
import { CartDOT } from "./cart/Cart.interface";
import CartService from "./cart/Cart.service";
import { OrderDOT } from "./order/Order.interface";
import OrderService from "./order/Order.service";
import Variation from "./product/variation/Variation.model";
import VariationService from "./product/variation/Variation.service";
import { SaleDOT } from "./Sale.interface";
import { Sale } from "./Sale.model";
import { ShippingDOT } from "./shipping/Shipping.interface";
import ShippingService from "./shipping/Shipping.service";
import SubscriptionService from "./subscription/Subscription.service";

@Injectable()
export class SaleService extends Service<typeof Sale> implements OnModuleInit {
  private customer: CustomerService;
  private transaction: TransactionService;
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly order: OrderService,
    private readonly cart: CartService,
    private readonly shipping: ShippingService,
    private readonly subscription: SubscriptionService,
    private readonly product: VariationService
  ) {
    super(Sale);
  }
  public onModuleInit() {
    this.customer = this.moduleRef.get(CustomerService, { strict: false });
    this.transaction = this.moduleRef.get(TransactionService, {
      strict: false
    });
  }
  public async unprocessed(
    res: Response,
    customerID: string,
    orderDOT: OrderDOT,
    shippingDOT: ShippingDOT,
    cartDOT: CartDOT
  ): Promise<Sale> {
    const customer = await this.customer.get(customerID);
    const order = await this.order.add(orderDOT);
    const shipping = await this.shipping.add(shippingDOT);
    const cart = await this.cart.add(cartDOT);
    const products = await this.product.getAll(cart.productIDs);
    const transaction = await this.transaction.unpayed(
      [...products, shipping],
      TransactionType.SALE
    );
    const saleDOT: SaleDOT = {
      cartID: cart._id,
      shippingID: shipping._id,
      customerID: customer._id,
      orderID: shipping._id,
      transactionID: transaction._id
    };
    this.cart.clearCookie(res);
    return new Sale(saleDOT);
  }
  public async pay(saleID: string, paymentID: string): Promise<void> {
    const sale = await this.get(saleID);
    if (!sale) throw new Error("Invalid Sale ID");
    const customer = await this.customer.get(sale.cartID);
    await this.transaction.capture(sale.transactionID, paymentID);
  }
  public async repay() {
    // Prereq: Customer, Subscriptions, Products, Email, Shipping, Order, Transaction
    // 1. Iterate through the customers
    this.customer.forAllWithSubscription(async customer => {
      try {
        const subscriptions = await this.subscription.findAllByLink(customer);
        subscriptions.filter(sub => {
          if (!sub.active) {
            /** SEND EMAIL */
            return false;
          }
          return true;
        });
        subscriptions.forEach(async sub => {
          const products: Variation[] = await this.product.getAll(
            sub.productIDs
          );
          const cart = await this.cart.add(products);
          const shipping = await this.shipping.createLowestCost(products);
          const order = await this.order.addDefault();
          // 6. Create a transaction
          const transaction = await this.transaction.unpayed(
            [shipping],
            TransactionType.SALE
          );
          // 8. Create Sales
          const saleDOT: SaleDOT = {
            orderID: order._id,
            customerID: customer._id,
            cartID: cart._id,
            shippingID: shipping._id,
            transactionID: transaction._id
          };
          this.add(saleDOT);
        });
      } catch (e) {}
    });
  }
  public getCart() {
    return this.cart;
  }
  public async cancel(saleID: string): Promise<void> {
    const sale = await this.get(saleID);
    const order = await this.order.get(sale.orderID);
    order.cancelled = true;
    order.save();
    await this.shipping.cancel(sale.shippingID);
    const transaction = await this.transaction.get(sale.transactionID);
    // TODO: REFUND
    if (transaction.amountOwed > 0) console.log("REFUND");
  }
}

export default SaleService;

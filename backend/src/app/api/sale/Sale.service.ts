import { Injectable, OnModuleInit } from "@nestjs/common";
import { Request } from "express";
import { SaleDOT } from "./Sale.interface";
import CustomerService from "../account/customer/Customer.service";
import OrderService from "../order/Order.service";
import CartService from "../cart/Cart.service";
import ShippingService from "../shipping/Shipping.service";
import TransactionService from "../billing/transaction/Transaction.service";
import { ShippingDOT, ShippingProvider } from "../shipping/Shipping.interface";
import { OrderDOT } from "../order/Order.interface";
import { CartDOT } from "../cart/Cart.interface";
import Service from "src/app/common/service/Service.factory";
import { Sale } from "./Sale.model";
import PaymentsService from "../billing/payments/Payments.service";
import { ModuleRef } from "@nestjs/core";
import { TransactionType } from "../billing/transaction/Transaction.interface";
import SubscriptionService from "../subscription/Subscription.service";
import Cart from "../cart/Cart.model";

@Injectable()
export class SaleService extends Service<typeof Sale> implements OnModuleInit {
  private customer: CustomerService;
  private order: OrderService;
  private cart: CartService;
  private shipping: ShippingService;
  private transaction: TransactionService;
  private subscription: SubscriptionService;
  constructor(private readonly moduleRef: ModuleRef) {
    super(Sale);
  }
  public onModuleInit() {
    this.customer = this.moduleRef.get(CustomerService);
    this.order = this.moduleRef.get(OrderService);
    this.cart = this.moduleRef.get(CartService);
    this.shipping = this.moduleRef.get(ShippingService);
    this.transaction = this.moduleRef.get(TransactionService);
    this.subscription = this.moduleRef.get(SubscriptionService);
  }
  public async unprocessed(
    ip: string,
    customerID: string,
    orderDOT: OrderDOT,
    shippingDOT: ShippingDOT,
    cartDOT: CartDOT
  ): Promise<Sale> {
    const customer = await this.customer.get(customerID);
    const order = await this.order.add(orderDOT);
    const shipping = await this.shipping.add(shippingDOT);
    const cart = await this.cart.add(cartDOT);
    const transaction = await this.transaction.unpayed(
      [cart, shipping],
      TransactionType.SALE
    );
    const saleDOT: SaleDOT = {
      cartID: cart._id,
      shippingID: shipping._id,
      customerID: customer._id,
      orderID: shipping._id,
      transactionID: transaction._id
    };
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
    const customers = await this.customer.findAll();
    customers.forEach(async customer => {
      try {
        // 2. We need to find the subscriptions within it
        // 3. Check subscription activity, if they are active continue
        // otherwise send an email to the customer appologizing that the subscription is no longer avaliable
        const subscriptions = await this.subscription.findAllByLink(customer);
        subscriptions
          .filter(cur => !cur.active)
          .forEach(cur => {
            /** Email Customer */
          });
        // 4. Look through the subscription products, if all the products exist contine,
        // otherwise send an email to the customer appologizing that the subscription product is not avaliable
        // and send a recommendation list to select from
        const activeSub = subscriptions.filter(cur => cur.active);
        const cartDOTs = activeSub.map(cur => {
          const cart: CartDOT = {
            products: cur.products
          };
          return cart;
        });
        const carts: Cart[] = await Promise.all(
          cartDOTs
            .map(cur =>
              this.cart.add(carts).catch(/** Email Customer and return null */)
            )
            .filter(cur => cur)
        );
        // 5. Create a shipping and order
        this.shipping.findCheapestProvider();
        // 6. Create a transaction
        // 7. If transaction fails, return
        // 8. Create Sales
      } catch (e) {}
    });
  }
}

export default SaleService;

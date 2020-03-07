import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Response } from "express";
import Service from "src/app/common/service/Service.factory";
import AccountService from "../account/Account.service";
import CustomerService from "../account/type/customer/Customer.service";
import CostSchema from "../billing/transaction/cost/Cost.schema";
import {
  RefundedTransaction,
  SaleTransaction
} from "../billing/transaction/Transaction.class";
import TransactionService from "../billing/transaction/Transaction.service";
import Store from "../company/store/Store.model";
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
  private account: AccountService;
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
    this.account = this.moduleRef.get(AccountService, { strict: false });
    this.transaction = this.moduleRef.get(TransactionService, {
      strict: false
    });
  }
  /**
   * This creates an unprocessed sales to be processed in the future. This should only be used if a sale is going to be
   * created in the future, however, the information is required for the view.
   * @param res Controller Response
   * @param customerID Database Customer ID
   * @param orderDOT Database Order ID
   * @param shippingDOT Database Shipping ID
   * @param cartDOT Cart Data of Tranfer Object
   */
  public async authorize(
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
    const transaction = await this.transaction.authorizeT([
      ...products,
      shipping
    ]);
    const saleDOT: SaleDOT = {
      cartID: cart._id,
      shippingID: shipping._id,
      customerID: customer._id,
      orderID: order._id,
      transactionID: transaction._id
    };
    this.cart.clearCookie(res);
    return new Sale(saleDOT);
  }
  /**
   * The converts an unprocessed sales into a processed sales that is payed by the payment ID. Payment must be a valid
   * payment registered in the customer payment options.
   * @param saleID Database Sale ID
   * @param paymentID Database Payment ID
   */
  public async process(saleID: string, paymentID: string): Promise<void> {
    const sale = await this.get(saleID);
    if (!sale) throw new Error("Invalid Sale ID");
    const customer = await this.customer.get(sale.cartID);
    await this.transaction.capture(sale.transactionID, paymentID);
  }
  /**
   * Loops through all customers that have an active subscriptions and pays for it if the product is still in the
   * inventory. Otherwise it emails the customers that we no longer carry the subscriptions and offer recommendations.
   */
  public async repay() {
    // Prereq: Customer, Subscriptions, Products, Email, Shipping, Order, Transaction
    // 1. Iterate through the customers
    this.customer.forAllWithSubscription(async customer => {
      try {
        const subscriptions = await this.subscription.findAllByLink(customer);
        const account = await this.account.get(customer.accountID);
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
          const provider = await this.shipping.getBestProvider(products);
          // Get Nearest Store
          const shipping = await this.shipping.ship(
            provider,
            4,
            products,
            // Find closest store to decrease shipping fee
            new Store(),
            account
          );
          const order = await this.order.addDefault();
          // 6. Create a transaction
          const transaction = await this.transaction.authorizeT([
            ...products,
            shipping
          ]);
          // Implement primary payment method
          this.transaction.capture(transaction._id, "");
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
      } catch (e) {
        // Email Customer
      }
    });
  }
  /**
   * Cancels any sale that are not shipped from the any store location.
   *
   * `NOTE:` Any sale that has been shipped cannot be canceled. Only a return can take place once the items has reached
   * the customers.
   * @param saleID Database Sale ID
   */
  public async cancel(saleID: string): Promise<void> {
    const sale = await this.get(saleID);
    const order = await this.order.get(sale.orderID);
    order.cancelled = true;
    order.save();
    await this.shipping.cancel(sale.shippingID);
    const transaction = await this.transaction.get(sale.transactionID);
    // TODO: REFUND
    if (transaction.amountPayed > 0) console.log("Please Refund Instead");
  }
  /**
   * Returns any order that has arrived on the customers. Refund is not gaurenteed, until the a store recieves the
   * complete order, in which a full refund will be permitted
   *
   * `NOTE:` A return is not free, therefore a shipping and handling fee must be applied.
   * @param saleID Database Sale ID
   */
  public async return(saleID: string) {
    const sale = await this.get(saleID);
    const cart = await this.cart.get(sale.cartID);
    const account = await this.account.get(
      (await this.customer.get(sale.customerID)).accountID
    );
    const products = await this.product.getAll(cart.productIDs);
    const shipping = await this.shipping.return(
      sale.shippingID,
      account,
      new Store()
    );
    // Create Order
    const transaction = await this.transaction.authorizeT([shipping]);
    const saleDOT: SaleDOT = {
      cartID: sale.cartID,
      customerID: sale.customerID,
      shippingID: shipping._id,
      orderID: String(),
      transactionID: transaction._id
    };
    const nextSale = new Sale(saleDOT);
    await nextSale.save();
    return nextSale;
  }
  /**
   *
   * @param saleID Database Sale ID
   * @param status true = success | false = failure
   */
  public async returnAs(saleID: string, status: boolean): Promise<Sale> {
    const sale = await this.get(saleID);
    const refund = new RefundedTransaction(
      await this.transaction.get(sale.transactionID)
    );
    const paymentID = refund.getPayment();
    // Accept Sales
    await this.transaction.capture(sale.transactionID, paymentID);
    return new Sale();
  }
  /**
   * Refunds Product Only
   * @param saleID Database Sale ID
   * @param paymentID Database PaymentID associated to the customer sales.
   */
  public async refund(saleID: string) {
    const sale = await this.get(saleID);
    const transaction = new SaleTransaction(
      await this.transaction.get(sale.transactionID)
    );
    const inverse: CostSchema[] = transaction
      .getRefundableCharges()
      .map(cur => cur.refund());
    const refund = await this.transaction.authorizeC(inverse);
  }

  public getCart() {
    return this.cart;
  }
}

export default SaleService;

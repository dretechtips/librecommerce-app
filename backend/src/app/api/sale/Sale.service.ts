import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Response } from "express";
import Service from "src/app/common/service/Service.factory";
import Store from "../account/store/Store.model";
import TransactionService from "../billing/transaction/Transaction.service";
import { CartDOT } from "./cart/Cart.interface";
import CartService from "./cart/Cart.service";
import { OrderDOT } from "./order/Order.interface";
import OrderService from "./order/Order.service";
import { SaleDOT } from "./Sale.interface";
import { Sale } from "./Sale.model";
import { ShippingDOT } from "./shipping/Shipping.interface";
import ShippingService from "./shipping/Shipping.service";
import SubscriptionService from "./subscription/Subscription.service";
import AccountService from "../account/Account.service";
import PromoService from "./promo/Promo.service";
import ProductService from "./product/Product.service";
import { InjectModel } from "src/app/common/model/Model.decorator";
import EmailService from "../email/Email.service";
import { ProductNotInCartException } from "./cart/Cart.exception";
import { ProductReviewDOT } from "./product/product_review/ProductReview.interface";
import { RefundTransaction } from "../billing/transaction/refund_transaction/RefundTransaction.model";
import Shipping from "./shipping/Shipping.model";
import Transaction from "../billing/transaction/Transaction.model";
import SaleTransaction, {
  SaleTransactionSchema,
} from "../billing/transaction/sale_transaction/SaleTransaction.model";

@Injectable()
export class SaleService extends Service<Sale> implements OnModuleInit {
  private transaction: TransactionService;
  private account: AccountService;
  private email: EmailService;

  /**
   * Automatically void requests in one day.
   */
  private requestTimeout: number = 1000 * 60 * 60 * 24;

  constructor(
    @InjectModel(Sale) public readonly model: Sale,
    private readonly moduleRef: ModuleRef,
    private readonly order: OrderService,
    private readonly cart: CartService,
    private readonly shipping: ShippingService,
    private readonly subscription: SubscriptionService,
    private readonly product: ProductService,
    private readonly promo: PromoService
  ) {
    super();
    this.cart.beforeSave(this.validateCart, false);
  }

  public onModuleInit() {
    this.transaction = this.moduleRef.get(TransactionService, {
      strict: false,
    });
    this.account = this.moduleRef.get(AccountService, { strict: false });
    this.email = this.moduleRef.get(EmailService, { strict: false });
  }

  /**
   * This creates an unprocessed sales to be processed in the future.
   * This should only be used if a sale is going to be created in the future.
   * @param res Express Response
   * @param customerID Customer ID
   * @param orderDOT Order ID
   * @param pcde Promo Code
   * @param shippingDOT Shipping ID
   * @param cartDOT Cart DOT Object | Cart ID
   * @returns Sale for view
   */
  public async request(
    res: Response,
    accountID: string,
    orderDOT: OrderDOT,
    shippingDOT: ShippingDOT,
    pcde: string[],
    cartDOT: CartDOT | string
  ): Promise<Sale> {
    const account = await this.account.get(accountID);
    const order = await this.order.add(orderDOT);
    const shipping = await this.shipping.add(shippingDOT);
    const cart = await this.cart.add(
      typeof cartDOT === "string" ? await this.get(cartDOT) : cartDOT
    );
    const products = await this.product.getAll(cart.productIDs);
    const discounts = (
      await Promise.all(pcde.map((code) => this.promo.apply(code, products)))
    ).reduce((total, cur) => total.concat(cur));
    const transaction = new SaleTransaction(
      new SaleTransactionSchema([...products, shipping, ...discounts])
    );
    await this.transaction.add(transaction);
    const saleDOT: SaleDOT = {
      cartID: cart._id,
      shippingID: shipping._id,
      accountID: account._id,
      orderID: order._id,
      transactionID: transaction._id,
    };
    this.cart.clearCookie(res);
    this.autoVoidRequest(transaction);
    return new Sale(saleDOT);
  }
  /**
   * The converts an unprocessed sales into a processed sales that is payed by the payment ID.
   * Payment must be a valid payment registered in the account payment options.
   * @param saleID Sale ID
   * @param pIndex Account Payment Index
   */
  public async process(saleID: string, pIndex?: number): Promise<void> {
    try {
      const sale = await this.get(saleID);
      if (!sale) throw new Error("Invalid Sale ID");
      const account = await this.account.get(sale.accountID);
      await this.transaction.captureByPayments(
        sale.transactionID,
        account,
        pIndex
      );
    } catch (e) {
      this.void(
        saleID,
        SaleTransaction,
        "An attempt to process a sale was made; however, an error has occured. Please try again."
      );
    }
  }
  /**
   * Loops through all the accounts that have an active subscriptions and pays for it if the product is still in the
   * inventory. Otherwise it emails the the accounts that we no longer carry the subscriptions and offer recommendations.
   * @todo Fix this
   */
  public async repay() {
    // 1. Iterate through the customers
    this.customer.forAllWithSubscription(async (customer) => {
      try {
        const subscriptions = await this.subscription.findAllByLink(customer);
        subscriptions.filter((sub) => {
          if (!sub.active) {
            /** SEND EMAIL */
            return false;
          }
          return true;
        });
        subscriptions.forEach(async (sub) => {
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
            customer
          );
          const order = await this.order.addDefault();
          // 6. Create a transaction
          const transaction = await this.transaction.authorizeT([
            ...products,
            shipping,
          ]);
          // Implement primary payment method
          this.transaction.capture(transaction._id, "");
          // 8. Create Sales
          const saleDOT: SaleDOT = {
            orderID: order._id,
            customerID: customer._id,
            cartID: cart._id,
            shippingID: shipping._id,
            transactionID: transaction._id,
          };
          this.add(saleDOT);
        });
      } catch (e) {
        // Email Customer
      }
    });
  }
  /**
   * Modifies the sale by cancelling sale that are not shipped from the any store location.
   *
   * `NOTE:` Any sale that has been shipped cannot be canceled. Only a return can take place once the items has reached
   * the customers.
   * @param saleID Database Sale ID
   */
  public async cancel(saleID: string): Promise<Sale> {
    const sale = await this.get(saleID);
    const transaction = await this.transaction.sale.get(sale.transactionID);
    const order = await this.order.get(sale.orderID);
    const shipping = await this.shipping.get(sale.shippingID);
    order.cancel();
    await order.save();
    shipping.cancel();
    await shipping.save();
    if (transaction.amountPayed > 0) {
      const nextTransaction = transaction.toRefund();
      nextTransaction.save();
      sale.transactionID = nextTransaction._id;
      await sale.save();
    }
    return sale;
  }
  /**
   * Returns any order that has arrived on the customers.
   * Refund is not gaurenteed, until the a store approves of the order, in which case a full refund will be permitted.
   * Not shipping the packages by the intended shipping date will be considered as a canceled return and thus no money
   * will be reimbursed.
   *
   * `NOTE:` A return is not free, therefore a shipping and handling fee must be applied.
   * @param saleID Database Sale ID
   * @returns Return Sale
   */
  public async requestReturn(saleID: string): Promise<Sale> {
    const sale = await this.get(saleID);
    const transaction = await this.transaction.sale.get(sale.transactionID);
    const account = await this.account.get(sale.accountID);
    const nextShipping = await this.shipping.return(
      sale.shippingID,
      account,
      this.account.getClosestStore(account)
    );
    const nextOrder = this.order.default();
    const nextTransaction = this.getRefundTransaction(
      transaction,
      nextShipping
    );
    nextTransaction.paymentID = transaction.paymentID;
    const saleDOT: SaleDOT = {
      cartID: sale.cartID,
      accountID: sale.accountID,
      shippingID: (await this.shipping.add(nextShipping))._id,
      orderID: (await this.order.add(nextOrder))._id,
      transactionID: (await this.transaction.add(nextTransaction))._id,
    };
    this.autoVoidRequest(nextTransaction);
    return this.add(saleDOT);
  }

  /**
   * Creates a refund transaction for the client.
   * @param transaction Transaction
   * @param nextShipping New Shipping
   */
  private getRefundTransaction(
    transaction: SaleTransaction,
    nextShipping: Shipping
  ): RefundTransaction {
    const nextTransaction = transaction.toRefund();
    nextTransaction.addCost(nextShipping.cost);
    return nextTransaction;
  }

  /**
   * Verifies if the return packages has arrived to a nearby facility. If so the transaction will be refunded.
   * @param saleID Sale ID
   * @param status true = success | false = failure
   */
  public async verifyReturn(saleID: string, status: boolean): Promise<boolean> {
    try {
      const sale = await this.get(saleID);
      const transaction = await this.transaction.refund.get(saleID);
      const account = await this.account.get(sale.transactionID);
      const paymentID = transaction.paymentID;
      if (!paymentID) throw new Error("Cannot return w/o a payment ID");
      await this.transaction.captureByPayment(transaction, paymentID);
      return true;
    } catch (e) {
      this.void(
        saleID,
        RefundTransaction,
        "An attempt to verify a return was made; however, an error has occured. Please try again."
      );
      return false;
    }
  }

  /**
   * Adds a review based off the associated sale
   * @param saleID Sale ID
   * @param productID Product ID
   */
  public async review(saleID: string, review: ProductReviewDOT): Promise<void> {
    const sale = await this.get(saleID);
    const transaction = await this.transaction.sale.get(sale.transactionID);
    const cart = await this.cart.get(sale.cartID);
    const account = await this.account.get(sale.accountID);
    if (cart.productIDs.indexOf(review.productID) === -1)
      throw new ProductNotInCartException();
    await this.product.addReview(account, review);
    await account.save();
  }
  /**
   * Voids any sale that has been manuelly voided or an internal error has occured that causes the sale to be unprocessable.
   * @param sale SaleID | Sale
   */
  public async void(
    sale: string | Sale,
    as: typeof Transaction,
    reason: string
  ): Promise<Sale> {
    if (typeof sale === "string") {
      sale = await this.get(sale);
    }
    const transaction = await this.transaction.get(sale.transactionID);
    if (!(transaction instanceof as))
      throw new TypeError("Invalid Transaction Type");
    await this.transaction.update(transaction._id, transaction.void());
    return sale;
  }

  /**
   * Checks if the cart is valid based off the sale services
   * @param cart Cart Data of Transfer
   */
  private validateCart(cart: CartDOT): Promise<boolean> {
    return this.validateIDs(cart.productIDs);
  }
  /**
   * Automatically voids a transaction whenever it not processed for an extended period.
   * @param transaction Transaction
   */
  private autoVoidRequest(transaction: Transaction) {
    setTimeout(() => {
      const next = transaction.void();
      this.update(transaction._id, next);
    }, this.requestTimeout);
  }
}

export default SaleService;

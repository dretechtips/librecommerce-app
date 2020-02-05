import { Injectable } from "@nestjs/common";
import Payments from "./Payments.model";
import { PaymentOption } from "./Payments.interface";
import AccountService from "src/api/account/Account.service";
import Transaction from "../Transaction.model";
import Account from "src/api/account/Account.model";
import Customer from "src/api/account/customer/Customer.model";
import PayflowService from "src/vendor/paypal/payflow/Payflow.service";
import { PayflowCorePayment } from "src/vendor/paypal/payflow/Payflow.interface";

@Injectable()
class PaymentsService {
  public constructor(private readonly payflow: PayflowService) {}
  // public async getMethod(methodID: string): Promise<PaymentOption | null> {
  //   const payment = (await Payments.getSelfByID(methodID)) as Payments | null;
  //   if (!payment) throw new Error("Customer storing invalid payment ID.");
  //   const paymentMethod = payment.get(methodID);
  //   return paymentMethod;
  // }
  private async getPayflowCore(
    transaction: Transaction,
    customer: Customer,
    paymentID: string
  ): Promise<PayflowCorePayment> {
    const payment = await customer.getPayment();
    if (!payment) throw new Error("Customer has invalid Payment");
    const option = await payment.get(paymentID);
    if (!option) throw new Error("Payment contains an invalid ID");
    const core = option.toPayflow(transaction);
    return core;
  }
  public async pay(
    transaction: Transaction,
    customer: Customer,
    paymentID: string
  ) {
    const core = await this.getPayflowCore(transaction, customer, paymentID);
    await this.payflow.pay(core);
  }
  public async validate(
    transaction: Transaction,
    customer: Customer,
    paymentID: string
  ): Promise<boolean> {
    try {
      const core = await this.getPayflowCore(transaction, customer, paymentID);
      await this.payflow.verify(core);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export default PaymentsService;

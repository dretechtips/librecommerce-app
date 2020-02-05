import { Injectable } from "@nestjs/common";
import ConfigService from "src/common/services/Config.service";
import {
  PayflowCredientals,
  PayflowCorePayment,
  PayflowTransactionType,
  PayflowTender
} from "./Payflow.interface";
import CreditCard, { Card } from "src/api/transaction/payments/card/Card.model";
import Transaction from "src/api/transaction/Transaction.model";
import Bank from "src/api/transaction/payments/bank/Bank.model";
import { TransactionType } from "src/api/transaction/Transaction.interface";
import { CardType } from "src/api/transaction/payments/card/Card.interface";
import { PaymentMethod } from "src/api/transaction/payments/Payments.interface";

@Injectable()
export class PayflowService {
  private credientals: PayflowCredientals | null;
  constructor(private readonly config: ConfigService) {
    this.init();
    this.credientals = null;
  }
  private async init() {
    this.credientals = await this.config.get<PayflowCredientals>(
      "paypal",
      "payflow"
    );
  }
  public async pay(payment: PayflowCorePayment) {
    await this.verify(payment);
  }
  public async verify(payment: PayflowCorePayment) {}
  private getTransactionType(transaction: Transaction) {
    switch (transaction.data().type as TransactionType) {
      case "sale":
        return PayflowTransactionType.SALE;
      case "rebate":
        return PayflowTransactionType.REFUND;
      case "refund":
        return PayflowTransactionType.REFUND;
      default:
        throw new Error("Invalid transaction type.");
    }
  }
  private getTransactionData(
    transaction: Transaction
  ): Omit<PayflowCorePayment, "ACCT" | "TENDER" | "EXPDATE"> {
    return {
      TRXTYPE: this.getTransactionType(transaction),
      AMT: transaction.data().amountPayed
    };
  }
  private formatExpDate(month: number, year: number): number {
    return Number(month + "" + year);
  }
  // public async payWithCard(
  //   card: CreditCard,
  //   transaction: Transaction
  // ): Promise<void> {
  //   const payment: PayflowCardPayment = {
  //     ...this.getTransactionData(transaction),
  //     TENDER: PayflowTender.CREDIT_CARD,
  //     ACCT: card.data().number,
  //     CVV: card.data().cvv,
  //     EXPDATE: this.formatExpDate(card.data().expMonth, card.data().expYear)
  //   };
  //   await this.pay(payment);
  // }
  // public async payWithACH(bank: Bank, transaction: Transaction): Promise<void> {
  //   const payment: PayflowACHPayment = {
  //     ...this.getTransactionData(transaction),
  //     TENDER: PayflowTender.ACH,
  //     ACCT: bank.data().account
  //   };
  //   await this.pay(payment);
  // }
  // public async payWithPaymentMethod(
  //   method: PaymentMethod,
  //   transaction: Transaction
  // ) {
  //   if (method instanceof Bank) this.payWithACH(method, transaction);
  //   if (method instanceof Card) this.payWithCard(method, transaction);
  //   throw new Error("Invalid Payment Method");
  // }
}

export default PayflowService;

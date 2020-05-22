import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Transaction from "./Transaction.model";
import { InjectModel } from "src/app/common/model/Model.decorator";
import { PaymentsDependentDOT } from "./payments/Payments.interface";
import { SaleTransactionService } from "./sale_transaction/SaleTransaction.service";
import RefundTransactionService from "./refund_transaction/RefundTransaction.service";
import VoidTransactionService from "./void_transaction/VoidTransaction.service";
import PaymentsService from "./payments/Payments.service";
import { TransactionCaptureException } from "./Transaction.exception";

@Injectable()
export class TransactionService extends Service<Transaction> {
  /**
   * This is only for Texas, USA. Interstate commerce has different tax laws.
   */
  private taxRate: number = 0.0725;
  constructor(
    @InjectModel(Transaction) public readonly model: Transaction,
    private readonly payments: PaymentsService,
    public readonly sale: SaleTransactionService,
    public readonly refund: RefundTransactionService,
    public readonly _void: VoidTransactionService
  ) {
    super();
  }

  /**
   * Creates an unpurchased transaction.
   * Authorizes some items to be purchased so that they can be captured/payed in the future.
   * @param items Any purchaseable items/serivces
   */
  public async authorize(transaction: Transaction): Promise<Transaction> {
    if (!transaction.capture) transaction.save();
    throw new Error("Transaction already captured");
  }

  /**
   * Creates a purchased transaction.
   * Captures the unauthorized transaction and pays for the full amount.
   * @param transactionID Transaction ID
   * @param dPayments Payments Dependent
   * @param index Payments Index
   */
  public async captureByPayments(
    transactable: string | Transaction,
    dPayments: PaymentsDependentDOT,
    index?: number
  ): Promise<Transaction> {
    const transaction =
      typeof transactable === "string"
        ? await this.get(transactable)
        : transactable;
    const payments = await this.payments.get(dPayments.paymentsID);
    return this.captureByPayment(
      transaction,
      payments.getPaymentID(index ? index : payments.dIndex)
    );
  }

  public async captureByPayment(
    transactable: string | Transaction,
    paymentID: string
  ): Promise<Transaction> {
    const transaction =
      typeof transactable === "string"
        ? await this.get(transactable)
        : transactable;
    // Call Payment Assistant API
    transaction.capture(paymentID);
    await transaction.save();
    return transaction;
  }
}

export default TransactionService;

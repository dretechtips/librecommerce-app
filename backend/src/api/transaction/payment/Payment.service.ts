import { Injectable } from "@nestjs/common";
import Card from "./card/Card.model";
import Bank from "./ach/Bank.model";
import Payment from "./Payment.model";
import { PaymentMethod } from "./Payment.interface";

@Injectable()
class PaymentService {
  public async getMethod(methodID: string): Promise<PaymentMethod | null> {
    const payment = (await Payment.getSelfByID(methodID)) as Payment | null;
    if (!payment) throw new Error("Customer storing invalid payment ID.");
    const paymentMethod = payment.get(methodID);
    return paymentMethod;
  }
}

export default PaymentService;

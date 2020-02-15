import Bank from "./bank/Bank.model";
import Card from "./card/Card.model";
import Transaction from "../transaction/Transaction.model";
import { PayflowCorePayment } from "src/app/vendor/paypal/payflow/Payflow.interface";

export interface PaymentsDOT {
  bankIDs: string[];
  ccIDs: string[];
}

export interface PaymentOption {
  toPayflow(): PayflowCorePayment;
}

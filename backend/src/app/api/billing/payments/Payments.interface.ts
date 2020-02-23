import { PayflowCorePayment } from "src/app/vendor/paypal/payflow/Payflow.interface";

export interface PaymentsDOT {
  bankIDs: string[];
  ccIDs: string[];
}

export interface PaymentsDependentDOT {
  paymentID: string;
}

export interface PaymentOption {
  toPayflow(): PayflowCorePayment;
}

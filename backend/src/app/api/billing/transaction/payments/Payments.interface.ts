import { PayflowCorePayment } from "src/app/vendor/paypal/payflow/Payflow.interface";

export interface PaymentsDOT {
  /**
   * Asscoiated Bank IDs
   */
  bankIDs: string[];
  /**
   * Associated Credit Card IDs
   */
  ccIDs: string[];
  /**
   * Default Index
   * Bank -> Credit Card -> ?
   */
  dIndex: number;
}

export interface PaymentsDependentDOT {
  paymentsID: string;
}

export interface PaymentOption {
  toPayflow(): PayflowCorePayment;
}

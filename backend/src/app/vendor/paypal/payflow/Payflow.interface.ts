export interface PayflowCredientals {
  PARTNER: string;
  VENDOR: string;
  USER: string;
  PWD: string;
}

export interface PayflowCoreParameters {
  TENDER: PayflowTender;
  TRXTYPE: PayflowTransactionType;
  ACCT: number;
  EXPDATE?: number;
  AMT: number;
  COMMENT1?: string;
  COMMENT2?: string;
  CVV?: number;
  RECURRING?: PayflowBoolean;
}

export type PayflowCoreTransaction = Pick<
  PayflowCoreParameters,
  "AMT" | "COMMENT1" | "COMMENT2" | "RECURRING" | "TRXTYPE"
>;

export type PayflowCorePayment = Pick<
  PayflowCoreParameters,
  "TENDER" | "ACCT" | "CVV" | "EXPDATE"
>;

export enum PayflowTender {
  ACH = "A",
  CREDIT_CARD = "C",
  DEBIT_CARD = "D"
}

export enum PayflowTransactionType {
  REFUND = "C",
  SALE = "S",
  VOID = "V"
}

export enum PayflowBoolean {
  TRUE = "Y",
  FALSE = "N"
}

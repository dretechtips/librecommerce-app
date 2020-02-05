export interface PayflowCredientals {
  PARTNER: string;
  VENDOR: string;
  USER: string;
  PWD: string;
}

export interface PayflowCorePayment {
  TENDER: PayflowTender;
  TRXTYPE: PayflowTransactionType;
  ACCT: number;
  EXPDATE?: number;
  AMT: number;
  COMMENT1?: string;
  COMMENT2?: string;
  CVV?: number;
  RECURRING?: PayflowBoolean;
  ORDERID?: string;
}

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

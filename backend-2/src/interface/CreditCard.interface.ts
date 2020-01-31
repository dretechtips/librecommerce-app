export interface CreditCardCompileType {
  number: number;
  cvv: number;
  expMonth: number;
  expYear: number;
  provider: string;
  type: string;
}

export type CardType = "credit" | "debit";

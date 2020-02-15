export interface CardDOT {
  number: number;
  cvv: number;
  expMonth: number;
  expYear: number;
  provider: CardProvider;
  type: CardType;
}

export enum CardType {
  CREDIT,
  DEBIT
}

export enum CardProvider {
  MASTERCARD,
  DISCOVER,
  VISA
}

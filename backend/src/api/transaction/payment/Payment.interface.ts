import Bank from "./ach/Bank.model";
import Card from "./card/Card.model";

export interface PaymentDOT {}

export interface PaymentOptionDOT {
  bankID: string[];
  ccID: string[];
}

export type PaymentMethod = Bank | Card;

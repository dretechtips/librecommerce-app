export interface CreditCard {
  provider: "mastercard" | "visa" | "discover";
  number: number;
  expMonth: number;
  expYear: number;
  cvv: number;
}

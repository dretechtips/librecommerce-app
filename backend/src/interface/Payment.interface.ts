export interface PaymentCompileType {
  creditCard: {
    number: number;
    cvv: number;
    expMonth: number;
    expYear: number;
  }[];
  bank: {
    account: number;
    routing: number;
  }[];
  paypalMe: string[];
}

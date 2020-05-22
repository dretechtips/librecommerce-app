export class TransactionNotRefundableException extends Error {
  constructor() {
    super();
    this.message = "The transaction provided cannot be refunded.";
  }
}
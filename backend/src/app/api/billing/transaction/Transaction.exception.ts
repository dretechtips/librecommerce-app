export class NegativeTransactionException extends Error {
  constructor() {
    super();
    this.message =
      "A negative transaction has occured. Please use the counter transaction to create this transaction.";
  }
}

export class TransactionCaptureException extends Error {
  constructor() {
    super();
    this.message = "A transaction has been captured multiple times";
  }
}

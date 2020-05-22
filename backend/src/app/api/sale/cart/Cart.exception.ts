export class ProductNotInCartException extends Error {
  constructor() {
    super();
    this.name = "ProductNotInCartException";
    this.message = "The product you looked for within the cart doesn't exist.";
  }
}
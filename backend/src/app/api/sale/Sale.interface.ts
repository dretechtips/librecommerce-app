
export interface SaleDOT {
  /**
   * Sale Order ID
   */
  orderID: string;
  /**
   * Sale Shipping ID
   */
  shippingID: string;
  /**
   * Sale Cart ID
   */
  cartID: string;
  /**
   * Sale Transaction ID
   */
  transactionID: string;
  /**
   * Sale Account ID
   */
  accountID: string;
}

export interface SaleDependentDOT {
  saleIDs: string[];
}

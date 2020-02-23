export interface SaleDOT {
  orderID: string;
  shippingID: string;
  cartID: string;
  transactionID: string;
  customerID: string;
}

export interface SaleDependentDOT {
  saleIDs: string[];
}

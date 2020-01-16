export interface OrderCompileType {
  customerID: string;
  shippingID: string;
  cartID: string;
  cancelled: boolean;
  cost: number;
  onHold: boolean;
}

export interface OrderDOT {
  cancelled: boolean;
  isHeld: boolean;
  complete: boolean;
}

export interface OrderDependentDOT {
  orderID: string;
}

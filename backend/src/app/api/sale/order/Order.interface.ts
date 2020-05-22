export interface OrderDOT {
  cancelled: boolean;
  isHeld: boolean;
  isComplete: boolean;
}

export interface OrderDependentDOT {
  orderID: string;
}

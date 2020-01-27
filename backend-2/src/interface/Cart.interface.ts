export interface CartDOT {
  products: CartItemDOT[];
}

export interface CartItemDOT {
  id: string;
  amount: number;
}

export interface CartDOT {
  products: CartProductDOT[];
}

export interface CartProductDOT {
  id: string;
  amount: number;
}

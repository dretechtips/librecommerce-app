export interface CartCompileType {
  products: CartItemCompileType[];
}

export interface CartItemCompileType {
  id: string;
  amount: number;
}

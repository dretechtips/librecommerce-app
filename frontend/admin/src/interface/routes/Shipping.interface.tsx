export interface Shipping {
  id: string;
  price: number;
  provider: "USPS" | "FEDEX" | "UPS";
  address: string;
}

export type NewShipping = Omit<Shipping, "id" | "price">;

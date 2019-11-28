export interface Shipping {
  id: string;
  price: string;
  provider: "USPS" | "FEDEX" | "UPS";
  address: string;
}

export type NewShipping = Omit<Shipping, "id" | "price">;

import Money from "../type/Money";
import { ProductVariation } from "../model/ProductVariation";

export class from {
  public static id(id: string): ProductVariation {
    
  }
}

export const getTotalCost = (products: ProductVariation[]): Money => {
  let price: Money = new Money(0.00);
  for (let i = 0; i < products.length; i++) {
    const cur: Money = products[i].getCost();
    price = price.add(cur);
  }
  return price;
}
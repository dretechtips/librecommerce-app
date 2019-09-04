import { Money } from "../model/Money";
import { Color } from "../type/Color";

export interface ProductConstructor
{
  name: string,
  id: string,
  categoryID: string, 
  price: Money,
  images: URL[],
  sizes: string[],
  color: Color,
  description: string,
  brand: string,
  rating: number,
  ratingAmount: number,
  stock: number,
  directions?: string,
  warning?: string,
  ingredients?: string[],
  benefits?: string[],
}
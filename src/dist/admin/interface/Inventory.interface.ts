import { Money } from "../model/Money";
import { Color } from "../model/Color";

export interface Product
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
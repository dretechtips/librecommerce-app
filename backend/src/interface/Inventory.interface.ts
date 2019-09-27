import { Money } from "../type/Money";
import { Color } from "../type/Color";

export interface ProductConstructor
{
  name: string,
  id: string,
  baseID: string,
  categoryID: string, 
  price: Money,
  images: URL[],
  sizes?: string[],
  colors?: Color[],
  description: string,
  brand: string,
  rating: number,
  ratingAmount: number,
  stock: number,
  directions?: string[],
  warning?: string,
  ingredients?: string[],
  benefits?: string[],
}

export interface NewProductBody
{
  name: string,
  baseID: string,
  categoryID: string,
  price: number,
  brand: string,
  images: string[],
  sizes?: string[],
  colors?: string[],
  description: string,
  stock: number,
  directions?: string[],
  warning?: string,
  ingredients?: string[],
  benefits?: string[],
}

export interface ExistingProductBody extends NewProductBody
{
  id: string,
  rating: number,
  ratingAmount: number
}

export interface ProductSearchQuery
{
  name?: string,
  id?: string,
  minPrice?: number,
  maxPrice?: number,
  brand?: string,
  stock?: string, 
}

export interface CategoryBody {
  name: string;
  id: string;
}
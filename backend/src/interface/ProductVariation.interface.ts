import Money from "../type/Money";
import Color from "../type/Color";

export interface Constructor {
  name: string,
  id: string,
  baseID: string,
  price: Money,
  images: URL[],
  size?: string,
  color?: Color,
  stock: number,
}
export interface NewBody {
  name: string,
  baseID: string,
  price: number,
  images: string[],
  size?: string,
  color?: string,
  stock: number,
}
export interface ExistingBody extends NewBody {
  id: string,
}

export interface SearchQuery {
  name?: string,
  id?: string,
  minPrice?: number,
  maxPrice?: number,
  brand?: string,
  stock?: string, 
}
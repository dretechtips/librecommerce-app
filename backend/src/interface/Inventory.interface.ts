import { Money } from "../type/Money";
import { Color, color } from "../type/Color";

export namespace IProduct {
  export interface Constructor {
    name: string,
    id: string,
    categoryID: string,
    description: string,
    brand: string,
    rating: number,
    ratingAmount: number,
    directions?: string[],
    warning?: string,
    ingredients?: string[],
    benefits?: string[],
  }
  export interface NewBody {
    name: string,
    categoryID: string,
    brand: string,
    description: string,
    directions?: string[],
    warning?: string,
    ingredients?: string[],
    benefits?: string[],
  }
  export interface ExistingBody extends NewBody {
    id: string,
    rating: number,
    ratingAmount: number
  }
}

export namespace IProductVariation {
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
}

export namespace ICategory {
  export interface Body {
    name: string;
    id: string;
  }
}

export namespace ISearchQuery {
  export interface Product {
    name?: string,
    id?: string,
    minPrice?: number,
    maxPrice?: number,
    brand?: string,
    stock?: string, 
  }
}
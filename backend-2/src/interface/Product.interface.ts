export interface ProductCompileType {
  name: string;
  categoryID: string;
  description: string;
  brand: string;
  directions: string[];
  warning: string;
  ingredients: string[];
  benefits: string[];
  rating: number;
  ratingAmount: number;
}

export interface ProductReviewCompileType {
  productID: string;
  customerID: string;
  stars: number;
}

export interface ProductVariationCompileType {
  name: string;
  productID: string;
  price: number;
  images: string[];
  size: string;
  color: string;
  stock: number;
}

export interface ProductCategoryCompileType {
  name: string;
}

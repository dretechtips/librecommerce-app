import { FormQuestion, FormModifier } from "../Form.interface";

export type ProductTypes = "base" | "variation";

interface ProductBaseProps {
  type: ProductTypes;
}

export interface ProductProps extends ProductBaseProps {}

export interface ProductAddProps extends ProductBaseProps {}

export interface ProductSearchProps extends ProductBaseProps {}

export interface ProductFormProps extends ProductBaseProps {
  modifer: FormModifier;
}

export interface Product {
  name: string;
  id: string;
  categoryID: string;
  description: string;
  directions?: string[];
  warning?: string[];
  ingredients?: string[];
  benefits?: string[];
  imagesURL: string[];
}

export interface ProductVariation {
  id: string;
  name: string;
  productID: string;
  price: number;
  imagesURL: string[];
  size?: string;
  color?: string;
  stock: number;
}

export interface Category {
  name: string;
  id: string;
  tags: string[];
}

import { FormModifier } from "../Form.interface";
import { Selection, CRUDPath } from "../CRUD.interface";

interface InventoryFormProps {
  modifer: FormModifier;
}

export interface ProductProps {}

export interface ProductData {
  name: string;
  id: string;
  brand: string;
  categoryID: string;
  description: string;
  directions: string[];
  warning: string;
  ingredients: string[];
  benefits: string[];
  imagesURL: string[];
  tags: string[];
}

export type NewProductData = Omit<ProductData, "id" | "imagesURL">;

export interface ProductVariation {
  id: string;
  name: string;
  productID: string;
  price: number;
  imagesURL: string[];
  size: string;
  color: string;
  stock: number;
  SKU: string;
  UPC: string;
  tags: string[];
}

export type NewProductVariation = Omit<ProductVariation, "id">;

export interface Category {
  name: string;
  id: string;
  tags: string[];
  description: string;
}

export type NewCategory = Omit<Category, "id">;

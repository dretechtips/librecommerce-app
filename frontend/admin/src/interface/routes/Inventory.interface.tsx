import { FormQuestion, FormModifier } from "../Form.interface";
import { Selection, CRUDPath } from "../CRUD.interface";

interface InventoryFormProps {
  modifer: FormModifier;
}

export interface ProductProps {}

export interface Product {
  name: string;
  timestamp: string;
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

export type NewProduct = Omit<Product, "id" | "imagesURL" | "timestamp">;

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

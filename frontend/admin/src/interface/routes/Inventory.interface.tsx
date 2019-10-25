import { FormQuestion, FormModifier } from "../Form.interface";

export type ProductTypes = "base" | "variation"

export interface ProductFormProps {
  type: ProductTypes;
  modifer: FormModifier;
}

export interface ProductSearchProps {
  type: ProductTypes;
}
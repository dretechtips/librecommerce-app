import { FormQuestion, FormModifier } from "../Form.interface";

export interface ProductFormProps {
  type: "base" | "variation";
  modifer: FormModifier;
}


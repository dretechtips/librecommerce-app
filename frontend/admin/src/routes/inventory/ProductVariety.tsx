import React from "react";
import CURDComponent from "../../templates/CURD.component";
import {
  NewProductVariation,
  ProductVariation
} from "../../interface/routes/Inventory.interface";
import { FormRelation } from "../../interface/Form.interface";
import { LookupbarResult } from "../../interface/Lookupbar.interface";
import { variation } from "./TestUnit";
import FormField from "../../components/FormField";

class ProductVariety extends CURDComponent<
  ProductVariation,
  NewProductVariation
> {
  public name = "Product Variety";
  public cQuestions: FormRelation<NewProductVariation> = {
    name: new FormField({ question: { label: "Name", input: "text" } }),
    SKU: new FormField({ question: { label: "SKU", input: "barcode" } }),
    UPC: new FormField({ question: { label: "UPC", input: "barcode" } }),
    productID: new FormField({ question: { label: "Product", input: "text" } }),
    price: new FormField({ question: { label: "Price", input: "text" } }),
    imagesURL: new FormField({ question: { label: "Images", input: "photo" } }),
    stock: new FormField({
      question: { label: "Stock Quantity", input: "text" }
    }),
    tags: new FormField({ question: { label: "Tags", input: "tagsbox" } }),
    size: new FormField({ question: { label: "Size", input: "text" } }),
    color: new FormField({ question: { label: "Color", input: "text" } })
  };
  public sQuestions: FormRelation<
    Omit<ProductVariation, keyof NewProductVariation>
  > = {
    id: new FormField({ question: { label: "ID", input: "text" } })
  };
  public update = async (
    value: Partial<NewProductVariation>
  ): Promise<void> => {};
  public delete = async (id: string): Promise<void> => {};
  public fetch = async (id: string): Promise<ProductVariation> => {
    return variation;
  };
  public query = async (value: string): Promise<ProductVariation[]> => {
    return [variation, variation, variation, variation];
  };
  public new = async (value: NewProductVariation): Promise<void> => {};
  public toResult = (value: ProductVariation): LookupbarResult => {
    return {
      id: value.id,
      title: value.name,
      description: "$" + value.price,
      image: value.imagesURL[0]
    };
  };
}

export default ProductVariety;

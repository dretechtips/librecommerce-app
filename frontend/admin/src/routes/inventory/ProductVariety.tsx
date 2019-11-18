import React from "react";
import CURDComponent from "../../templates/CURD.component";
import {
  NewProductVariation,
  ProductVariation
} from "../../interface/routes/Inventory.interface";
import { FormRelation } from "../../interface/Form.interface";
import { LookupbarResult } from "../../interface/Lookupbar.interface";
import { variation } from "./TestUnit";

class ProductVariety extends CURDComponent<
  ProductVariation,
  NewProductVariation
> {
  public name = "Product Variety";
  public cQuestions: FormRelation<NewProductVariation> = {
    name: { question: "Name", input: "text" },
    SKU: { question: "SKU (Stock Keeping Unit)", input: "barcode" },
    UPC: { question: "UPC (Universal Product Code)", input: "barcode" },
    productID: { question: "Product ID", input: "text" },
    price: { question: "Price", input: "text" },
    imagesURL: { question: "Images", input: "photo" },
    stock: { question: "Stock Quantity", input: "text" },
    tags: { question: "Tags", input: "tagsbox" },
    size: { question: "Size", input: "text" },
    color: { question: "Color", input: "text" }
  };
  public sQuestions: FormRelation<
    Omit<ProductVariation, keyof NewProductVariation>
  > = {
    id: { question: "ID", input: "text" }
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

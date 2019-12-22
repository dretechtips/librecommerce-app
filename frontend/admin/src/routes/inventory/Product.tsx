import React from "react";
import Card from "../../components/Card";
import {
  ProductData,
  NewProductData
} from "../../interface/routes/Inventory.interface";
import { FormRelation } from "../../interface/Form.interface";
import CURDComponent from "../../templates/CURD.component";
import { LookupbarResult } from "../../interface/Lookupbar.interface";
import { product } from "./TestUnit";
import FormField from "../../components/FormField";

class Product extends CURDComponent<ProductData, NewProductData> {
  public name = "product";
  public cQuestions: FormRelation<NewProductData> = {
    name: new FormField({ question: { label: "Name", input: "text" } }),
    description: new FormField({
      question: { label: "Description", input: "textarea" }
    }),
    categoryID: new FormField({
      question: { label: "Category", input: "text" }
    }),
    brand: new FormField({ question: { label: "Brand", input: "text" } }),
    tags: new FormField({ question: { label: "Tags", input: "tagsbox" } }),
    warning: new FormField({ question: { label: "Warning", input: "text" } }),
    directions: new FormField({
      question: { label: "Directions", input: "textarea-list" }
    }),
    ingredients: new FormField({
      question: { label: "Ingredients", input: "tagsbox" }
    }),
    benefits: new FormField({
      question: { label: "Benefits", input: "textarea-list" }
    })
  };
  public sQuestions: FormRelation<Omit<ProductData, keyof NewProductData>> = {
    id: new FormField({ question: { label: "ID", input: "text" } }),
    imagesURL: new FormField({ question: { label: "Images", input: "photo" } })
  };
  public toResult = (value: ProductData): LookupbarResult => {
    return {
      title: value.name,
      description: value.description,
      id: value.id,
      image: value.imagesURL[0]
    };
  };
  public new = async (value: NewProductData): Promise<void> => {};
  public delete = async (id: string): Promise<void> => {};
  public update = async (value: NewProductData): Promise<void> => {};
  public fetch = async (id: string): Promise<ProductData> => {
    return product;
  };
  public query = async (value: string): Promise<ProductData[]> => {
    return [product, product, product, product, product];
  };
}

export default Product;

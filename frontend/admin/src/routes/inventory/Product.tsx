import React from "react";
import Card from "../../components/Card";
import {
  Product as IProduct,
  NewProduct,
  ProductProps
} from "../../interface/routes/Inventory.interface";
import { FormQuestion, FormRelation } from "../../interface/Form.interface";
import CURDComponent from "../../templates/CURD.component";
import { LookupbarResult } from "../../interface/Lookupbar.interface";
import { product } from "./TestUnit";

class Product extends CURDComponent<IProduct, NewProduct> {
  public name = "product";
  public cQuestions: FormRelation<NewProduct> = {
    name: { question: "Name", input: "text" },
    description: { question: "Description", input: "textarea" },
    categoryID: { question: "Category", input: "text" },
    brand: { question: "Brand", input: "text" },
    tags: { question: "Tags", input: "tagsbox" },
    warning: { question: "Warning", input: "text" },
    directions: { question: "Directions", input: "textarea" },
    ingredients: { question: "Ingredients", input: "textarea" },
    benefits: { question: "Benefits", input: "textarea" }
  };
  public sQuestions: FormRelation<Omit<IProduct, keyof NewProduct>> = {
    timestamp: { question: "Timestamp", input: "text" },
    id: { question: "ID", input: "text" },
    imagesURL: { question: "Images", input: "photo" }
  };
  public toResult = (value: IProduct): LookupbarResult => {
    return {
      title: value.name,
      description: value.description,
      id: value.id,
      image: value.imagesURL[0]
    };
  };
  public new = async (value: NewProduct): Promise<void> => {};
  public delete = async (id: string): Promise<void> => {};
  public update = async (value: NewProduct): Promise<void> => {};
  public fetch = async (id: string): Promise<IProduct> => {
    return product;
  };
  public query = async (value: string): Promise<IProduct[]> => {
    return [product, product, product, product, product];
  };
}

export default Product;

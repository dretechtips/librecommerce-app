import React from "react";
import Card from "../../components/Card";
import CURDComponent from "../../templates/CURD.component";
import {
  Category as ICategory,
  NewCategory
} from "../../interface/routes/Inventory.interface";
import { FormQuestion, FormRelation } from "../../interface/Form.interface";
import { LookupbarResult } from "../../interface/Lookupbar.interface";
import { category } from "./TestUnit";

class Category extends CURDComponent<ICategory, NewCategory> {
  public name = "Product Category";
  public cQuestions: FormRelation<NewCategory> = {
    name: { question: "Name", input: "text" },
    description: { question: "Description", input: "textarea" },
    tags: { question: "Associated Tags", input: "tagsbox" }
  };
  public sQuestions: FormRelation<Omit<ICategory, keyof NewCategory>> = {
    id: { question: "ID", input: "text" }
  };
  public toResult = (category: ICategory): LookupbarResult => {
    return {
      title: category.name,
      id: category.id,
      description: category.description
    };
  };
  public update = async (value: NewCategory): Promise<void> => {};
  public delete = async (id: string): Promise<void> => {};
  public fetch = async (id: string): Promise<ICategory> => {
    return category;
  };
  public new = async (value: NewCategory): Promise<void> => {};
  public query = async (value: string): Promise<ICategory[]> => {
    return [category, category, category, category];
  };
}

export default Category;

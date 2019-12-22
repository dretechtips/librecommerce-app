import React, { Component } from "react";
import CURDComponent from "../../templates/CURD.component";
import {
  SubscriptionData,
  NewSubscriptionData
} from "../../interface/routes/Subscription.interface";
import { FormRelation } from "../../interface/Form.interface";
import { LookupbarResult } from "../../interface/Lookupbar.interface";
import { bundle } from "./TestUnit";
import FormField from "../../components/FormField";

export class Archive extends CURDComponent<
  SubscriptionData,
  NewSubscriptionData
> {
  public name = "Bundle Subscription";
  public cQuestions: FormRelation<NewSubscriptionData> = {
    name: new FormField({ question: { label: "Bundle Name", input: "text" } }),
    productIDs: new FormField({
      question: { label: "Products", input: "text" }
    })
  };
  public sQuestions: FormRelation<
    Omit<SubscriptionData, keyof NewSubscriptionData>
  > = {
    id: new FormField({ question: { label: "ID", input: "text" } })
  };
  public delete = async (id: string) => {};
  public update = async (value: NewSubscriptionData) => {};
  public fetch = async (id: string): Promise<SubscriptionData> => {
    return bundle;
  };
  public query = async (value: string): Promise<SubscriptionData[]> => {
    return [];
  };
  public new = async (value: NewSubscriptionData) => {};
  public toResult = (value: SubscriptionData): LookupbarResult => {
    return {
      title: "Bundle Name: " + value.name,
      id: value.id,
      description: "Product IDs: " + value.productIDs
    };
  };
}

export default Archive;

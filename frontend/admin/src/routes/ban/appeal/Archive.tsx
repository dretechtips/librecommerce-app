import React, { Component } from "react";
import CURDComponent from "../../../templates/CURD.component";
import {
  BanAppealData,
  NewBanAppealData
} from "../../../interface/routes/Ban.interface";
import { FormRelation } from "../../../interface/Form.interface";
import { LookupbarResult } from "../../../interface/Lookupbar.interface";
import { banAppeal } from "../TestUnit";
import FormField from "../../../components/FormField";

export class Archive extends CURDComponent<BanAppealData, NewBanAppealData> {
  public name = "Ban Appeal";
  public cQuestions: FormRelation<NewBanAppealData> = {
    banID: new FormField({ question: { label: "Ban", input: "text" } }),
    message: new FormField({
      question: { label: "Customer Message", input: "textarea" }
    })
  };
  public sQuestions: FormRelation<
    Omit<BanAppealData, keyof NewBanAppealData>
  > = {
    id: new FormField({ question: { label: "ID", input: "text" } }),
    resolution: new FormField({
      question: {
        label: "Resolution",
        input: "select",
        props: { option: ["Resolved", "Rejected", "Unresolved"] }
      }
    })
  };
  public delete = async (id: string) => {};
  public update = async (value: NewBanAppealData) => {};
  public fetch = async (id: string): Promise<BanAppealData> => {
    return banAppeal;
  };
  public new = async (value: NewBanAppealData) => {};
  public query = async (value: string): Promise<BanAppealData[]> => {
    return [];
  };
  public toResult = (value: BanAppealData): LookupbarResult => {
    return {
      title: "Ban ID: " + value.banID,
      id: value.id,
      description: "Resolution: " + value.resolution
    };
  };
}

export default Archive;

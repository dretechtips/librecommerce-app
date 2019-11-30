import React, { Component } from "react";
import CURDComponent from "../../templates/CURD.component";
import {
  BanAppealData,
  NewBanAppealData
} from "../../interface/routes/Ban.interface";
import { FormRelation } from "../../interface/Form.interface";
import { LookupbarResult } from "../../interface/Lookupbar.interface";
import { banAppeal } from "./TestUnit";

export class AppealArchive extends CURDComponent<
  BanAppealData,
  NewBanAppealData
> {
  public name = "Ban Appeal";
  public cQuestions: FormRelation<NewBanAppealData> = {
    message: { question: "Customer Message", input: "textarea" },
    banID: { question: "Ban", input: "text" }
  };
  public sQuestions: FormRelation<
    Omit<BanAppealData, keyof NewBanAppealData>
  > = {
    id: { question: "ID", input: "text" },
    resolution: { question: "Resolution", input: "select" }
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

export default AppealArchive;

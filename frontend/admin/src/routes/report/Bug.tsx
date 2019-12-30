import React, { Component } from "react";
import CURDComponent from "../../templates/CURD.component";
import { BugData, NewBugData } from "../../interface/routes/Report.interface";
import { FormRelation } from "../../interface/Form.interface";
import FormField from "../../components/FormField";
import { LookupbarResult } from "../../interface/Lookupbar.interface";
import { bug } from "./TestUnit";

export class Bug extends CURDComponent<BugData, NewBugData> {
  public name: string = "Bug";
  public cQuestions: FormRelation<NewBugData> = {
    title: new FormField({
      question: { label: "Descriptive Title", input: "text" }
    }),
    category: new FormField({
      question: {
        label: "Category",
        input: "select",
        props: { option: ["UI Issue", "UX Issue", "Server Issue"] }
      }
    }),
    errorCode: new FormField({
      question: {
        label: "Server Error Code",
        input: "text"
      }
    }),
    errorMessage: new FormField({
      question: {
        label: "Server Error Message",
        input: "textarea"
      }
    }),
    steps: new FormField({
      question: {
        label: "Steps to reproduce the bug",
        input: "textarea-list"
      }
    }),
    startDate: new FormField({
      question: {
        label: "When did you start to experience this problem?",
        input: "date"
      }
    }),
    build: new FormField({
      question: {
        label: "Build Type",
        input: "select",
        props: {
          option: ["Development", "Testing", "Production"]
        }
      }
    })
  };
  public sQuestions: FormRelation<Omit<BugData, keyof NewBugData>> = {
    id: new FormField({ question: { label: "ID", input: "text" } })
  };
  public delete = async (id: string) => {};
  public fetch = async (id: string): Promise<BugData> => {
    return bug;
  };
  public new = async (value: NewBugData) => {};
  public query = async (value: string): Promise<BugData[]> => {
    return [bug];
  };
  public update = async (value: NewBugData) => {};
  public toResult = (value: BugData): LookupbarResult => {
    return {
      title: "Title:" + value.title,
      description: "Code: " + value.errorCode,
      id: value.id
    };
  };
}

export default Bug;

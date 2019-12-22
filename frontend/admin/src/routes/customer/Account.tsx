import React, { Component } from "react";
import CURDComponent from "../../templates/CURD.component";
import {
  CustomerData,
  NewCustomerData
} from "../../interface/routes/Customer.interface";
import { FormRelation } from "../../interface/Form.interface";
import { LookupbarResult } from "../../interface/Lookupbar.interface";
import { customerData } from "./TestUnit";
import FormField from "../../components/FormField";

export class Account extends CURDComponent<CustomerData, NewCustomerData> {
  public name = "Customer Account";
  public cQuestions: FormRelation<NewCustomerData> = {
    firstName: new FormField({
      question: { label: "First Name", input: "text" }
    }),
    lastName: new FormField({
      question: { label: "Last Name", input: "text" }
    }),
    username: new FormField({ question: { label: "Username", input: "text" } }),
    password: new FormField({
      question: { label: "Password", input: "password" }
    }),
    address: new FormField({
      question: { label: "Address", input: "address" }
    }),
    state: new FormField({ question: { label: "State", input: "text" } }),
    country: new FormField({ question: { label: "Country", input: "text" } }),
    emailAddress: new FormField({
      question: { label: "Email Address", input: "email" }
    }),
    phoneNum: new FormField({
      question: { label: "Phone Number", input: "text" }
    })
  };
  public sQuestions: FormRelation<Omit<CustomerData, keyof NewCustomerData>> = {
    id: new FormField({ question: { label: "ID", input: "text" } }),
    associatedIPs: new FormField({
      question: { label: "Associated IP Addresses", input: "tagsbox" }
    }),
    alerts: new FormField({
      question: { label: "Unread Alerts", input: "tagsbox" }
    }),
    ordersID: new FormField({
      question: { label: "Order IDs", input: "tagsbox" }
    }),
    lastOrderDate: new FormField({
      question: { label: "Last Order Date", input: "text" }
    })
  };
  public update = async (value: NewCustomerData): Promise<void> => {};
  public delete = async (id: string): Promise<void> => {};
  public fetch = async (id: string): Promise<CustomerData> => {
    return customerData;
  };
  public query = async (value: string): Promise<CustomerData[]> => {
    return [customerData, customerData, customerData];
  };
  public new = async (value: NewCustomerData): Promise<void> => {};
  public toResult = (value: CustomerData): LookupbarResult => {
    return {
      title: value.username,
      description: value.emailAddress,
      id: value.id
    };
  };
}

export default Account;

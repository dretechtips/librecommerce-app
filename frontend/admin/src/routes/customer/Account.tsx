import React, { Component } from "react";
import CURDComponent from "../../templates/CURD.component";
import {
  CustomerData,
  NewCustomerData
} from "../../interface/routes/Customer.interface";
import { FormRelation } from "../../interface/Form.interface";
import { LookupbarResult } from "../../interface/Lookupbar.interface";
import { customerData } from "./TestUnit";

export class Account extends CURDComponent<CustomerData, NewCustomerData> {
  public name = "Customer Account";
  public cQuestions: FormRelation<NewCustomerData> = {
    firstName: { question: "First Name", input: "text" },
    lastName: { question: "Last Name", input: "text" },
    username: { question: "Username", input: "text" },
    password: { question: "Password", input: "password" },
    address: { question: "Address", input: "address" },
    state: { question: "State", input: "text" },
    country: { question: "Country", input: "text" },
    emailAddress: { question: "Email Address", input: "email" },
    phoneNum: { question: "Phone Number", input: "text" }
  };
  public sQuestions: FormRelation<Omit<CustomerData, keyof NewCustomerData>> = {
    id: { question: "ID", input: "text" },
    associatedIPs: { question: "Associated IP Addresses", input: "tagsbox" },
    alerts: { question: "Unread Alerts", input: "tagsbox" },
    ordersID: { question: "Order IDs", input: "tagsbox" },
    lastOrderDate: { question: "Last Order Date", input: "text" }
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

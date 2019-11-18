import React, { Component } from "react";
import CURDComponent from "../../templates/CURD.component";
import {
  CustomerData,
  NewCustomerData
} from "../../interface/routes/Customer.interface";
import { FormRelation } from "../../interface/Form.interface";

export class Account extends CURDComponent<CustomerData, NewCustomerData> {
  public name = "Customer Account";
  public cQuestions: FormRelation<NewCustomerData> = {
    firstName: { question: "First Name", input: "text" },
    lastName: { question: "Last Name", input: "text" },
    username: { question: "Username", input: "text" },
    password: { question: "Password", input: "text" },
    address: { question: "Address", input: "text" },
    emailAddress: { question: "Email Address", input: "text" },
    phoneNum: { question: "Phone Number", input: "text" }
  };
  render() {
    return <div></div>;
  }
}

export default Account;

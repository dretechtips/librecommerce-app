import React, { Component } from "react";
import { Payroll } from "../../interface/routes/Payroll.interface";
import Invoice from "../../containers/Invoice";
import {
  InvoiceProps,
  InvoiceGoodorService,
  InvoiceSendTo
} from "../../interface/Invoice.interface";
import Card from "../../components/Card";

class Payslip extends Component implements InvoiceProps {
  private url: string = "Some URL";
  constructor() {
    super({});
    this.state = {};
  }
  public async getAdd(): Promise<InvoiceGoodorService[]> {
    return [];
  }
  public async getSubtract(): Promise<InvoiceGoodorService[]> {
    return [];
  }
  public async getTerms(): Promise<string> {
    return "Terms";
  }
  public async getComments(): Promise<string> {
    return "Comments";
  }
  public async getSendTo(): Promise<InvoiceSendTo> {
    return {
      name: "John Doe",
      email: "johndoe1@gmai.cfea",
      phone: "3218904238",
      address: "1234 Apple Street",
      city: "Dallas",
      state: "Texas",
      country: "USA"
    };
  }
  public async getDate(): Promise<Date> {
    return new Date();
  }
  public async getInvoiceNum(): Promise<number> {
    return 12345;
  }
  public render() {
    return (
      <Card theme="success" title={"Payslip"}>
        <Invoice
          getAdd={this.getAdd}
          getSubtract={this.getSubtract}
          getTerms={this.getTerms}
          getComments={this.getComments}
          getSendTo={this.getSendTo}
          getDate={this.getDate}
          getInvoiceNum={this.getInvoiceNum}
        />
      </Card>
    );
  }
}

export default Payslip;

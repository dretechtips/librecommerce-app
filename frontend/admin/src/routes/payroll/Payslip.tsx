import React, { Component } from "react";
import { Payroll } from "../../interface/routes/Payroll.interface";
import Invoice from "../../containers/Invoice";
import {
  InvoiceProps,
  InvoiceGoodorService,
  InvoiceSendTo
} from "../../interface/Invoice.interface";
import Card from "../../components/Card";

class PayslipInvoice extends Component implements InvoiceProps {
  private url: string = "Some URL";
  constructor() {
    super({});
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
      city: "Dallas",
      state: "Texas",
      country: "USA",
      address: "1234 Apple Street"
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

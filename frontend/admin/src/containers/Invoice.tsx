import React, { Component } from "react";
import InvoiceUI from "../components/Invoice";
import { InvoiceProps, InvoiceState } from "../interface/Invoice.interface";

export class Invoice extends Component<InvoiceProps, InvoiceState> {
  constructor(props: InvoiceProps) {
    super(props);
    this.state = {};
  }
  render() {
    return <InvoiceUI />;
  }
}

export default Invoice;

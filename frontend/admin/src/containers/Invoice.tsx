import React, { Component } from "react";
import InvoiceUI from "../components/Invoice";
import {
  InvoiceProps,
  InvoiceState,
  InvoiceGoodorService
} from "../interface/Invoice.interface";

export class Invoice extends Component<InvoiceProps, InvoiceState> {
  constructor(props: InvoiceProps) {
    super(props);
    this.state = {
      add: [],
      subtract: [],
      invoiceNum: null,
      terms: null,
      date: null,
      sendTo: null,
      comment: null
    };
  }
  public async componentDidMount() {
    const [
      add,
      subtract,
      invoiceNum,
      terms,
      date,
      sendTo,
      comment
    ] = await Promise.all([
      this.props.getAdd(),
      this.props.getSubtract(),
      this.props.getInvoiceNum(),
      this.props.getTerms(),
      this.props.getDate(),
      this.props.getSendTo(),
      this.props.getComments()
    ]);
    this.setState({
      ...this.state,
      add,
      subtract,
      invoiceNum,
      terms,
      sendTo: sendTo,
      date: date ? date.toString() : null,
      comment
    });
  }
  public calcTotalPrice(GorS: InvoiceGoodorService[]): number {
    return GorS.reduce((prev, next) => prev + next.price, 0);
  }
  public render() {
    return (
      <InvoiceUI
        {...this.props}
        add={this.state.add}
        subtract={this.state.subtract}
        invoiceNum={this.state.invoiceNum}
        terms={this.state.terms}
        date={this.state.date}
        sendTo={this.state.sendTo}
        calcTotalPrice={this.calcTotalPrice}
        comments={this.state.comment}
      />
    );
  }
}

export default Invoice;

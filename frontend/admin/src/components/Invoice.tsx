import React from "react";
import { InvoiceUIProps, InvoiceSendTo } from "../interface/Invoice.interface";
import Card from "./Card";
import App from "../containers/App";
import Table from "../containers/Table";

function Invoice(props: InvoiceUIProps) {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          {props.invoiceNum && <h4>Invoice #{props.invoiceNum}</h4>}
          {props.date && <p>Date: {props.date}</p>}
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12">
          {props.sendTo && (
            <div>
              <p className="font-weight-bold">Name: {props.sendTo.name}</p>
              {Object.keys(props.sendTo).map(cur => {
                if ((cur as keyof InvoiceSendTo) !== "name")
                  return <p>{props.sendTo![cur as keyof InvoiceSendTo]}</p>;
              })}
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Table
            head={["#", "Positive Cumulation", "Qty", "Total"]}
            items={[]}
          />
        </div>
        <div className="col-md-6">
          <Table
            head={["#", "Negative Cumulation", "Qty", "Total"]}
            items={[]}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p>
            <span className="font-weight-bold">Total Positive Cumulation:</span>{" "}
            ${props.calcTotalPrice(props.add)}
          </p>
          <p>
            <span className="font-weight-bold">Total Negative Cumulation:</span>{" "}
            ${props.calcTotalPrice(props.subtract)}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h5>Terms & Service</h5>
          <p>{props.terms ? props.terms : "There was no terms."}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h5>Comment</h5>
          <p>
            {props.comments
              ? props.comments
              : "There was no comment on this invoice."}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Invoice;

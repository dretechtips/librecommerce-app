import React from "react";
import { InvoiceUIProps, InvoiceSendTo } from "../interface/Invoice.interface";
import Card from "./Card";
import App from "../containers/App";
import Table from "../containers/Table";
import Button from "./Button";

function Invoice(props: InvoiceUIProps) {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-wrap align-items-center">
            <i className="fas fa-file-invoice fa-5x mr-4 d-print-none"></i>
            <div>
              {props.invoiceNum && <h4>Invoice #{props.invoiceNum}</h4>}
              {props.date && <p>Date: {props.date}</p>}
            </div>
            <div className="ml-sm-auto d-print-none">
              <Button
                color="success"
                value="Print"
                icon="fas fa-print"
                action={() => window.print()}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row mb-2">
        <div className="col-12">
          {props.sendTo && (
            <div>
              <p className="font-weight-bold m-1">Name: {props.sendTo.name}</p>
              <p className="m-1">
                Phone #:{" "}
                <a target="_blank" href={"tel:" + props.sendTo.phone}>
                  {props.sendTo.phone}
                </a>
              </p>
              <p className="m-1">
                Email:{" "}
                <a target="_blank" href={"mailto:" + props.sendTo.phone}>
                  {props.sendTo.email}
                </a>
              </p>
              <p className="m-1">{props.sendTo.address}</p>
              <p className="m-1">
                {props.sendTo.city}, {props.sendTo.state},{" "}
                {props.sendTo.country}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Table
            bordered
            stripped
            head={["#", "Positive Cumulation", "Qty", "Total"]}
            items={[]}
          />
        </div>
        <div className="col-md-6">
          <Table
            bordered
            stripped
            head={["#", "Negative Cumulation", "Qty", "Total"]}
            items={[]}
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <h5>Terms & Service</h5>
          <p>{props.terms ? props.terms : "There was no terms."}</p>
          <h5>Comment</h5>
          <p>
            {props.comments
              ? props.comments
              : "There was no comment on this invoice."}
          </p>
        </div>
        <div className="col-md-6 text-md-right">
          <p className="m-1">
            <span className="font-weight-bold">
              Subtotal Positive Cumulation:
            </span>{" "}
            ${props.calcTotalPrice(props.add)}
          </p>
          <p className="m-1">
            <span className="font-weight-bold">
              Subtotal Negative Cumulation:
            </span>{" "}
            ${props.calcTotalPrice(props.subtract)}
          </p>
          <h4>
            Total: $
            {props.calcTotalPrice(props.add) -
              props.calcTotalPrice(props.subtract)}
          </h4>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Invoice;

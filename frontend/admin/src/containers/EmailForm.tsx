import React, { Component } from "react";
import ReactDOM from "react-dom";
import Form from "./Form";
import EmailFormUI from "../components/EmailForm";
import {
  EmailFormProps,
  EamilFormState,
  EmailFormQuestions
} from "../interface/EmailForm.interface";
import jsPDF from "jspdf";

export class EmailForm extends Component<EmailFormProps, EamilFormState> {
  constructor(props: EmailFormProps) {
    super(props);
    this.state = {
      to: "",
      name: "",
      subject: "",
      body: ""
    };
  }
  private imageToDataURI(url: string): Promise<string> {
    return new Promise(res => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const image: HTMLImageElement = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      image.src = this.props.logoURL;
      image.onload = function() {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        ctx!.drawImage(image, 0, 0);
        console.log(canvas.toDataURL());
        res(canvas.toDataURL());
      };
    });
  }

  private generatePDF = async (): Promise<jsPDF> => {
    const doc = new jsPDF("portrait");
    doc.addImage(
      await this.imageToDataURI(this.props.logoURL),
      "PDF",
      0,
      0,
      50,
      50
    );
    doc.text(
      [
        "Recepient Data",
        this.state.body,
        "X________________",
        "Signature",
        "X________________",
        "Note: Any letter created without a supervisor signature is considered to be voided and invalid."
      ],
      0,
      50
    );
    console.log(doc);
    return doc;
  };
  public print = async (): Promise<void> => {};
  public download = async (): Promise<void> => {
    const pdf = await this.generatePDF();
    pdf.save("Client_Generated_PDF_" + new Date() + ".pdf");
  };
  private getInputs = (inputs: { [K in keyof EmailFormQuestions]: string }) => {
    console.log(inputs);
    this.setState({
      ...this.state,
      to: inputs.to,
      subject: inputs.subject,
      body: inputs.body
    });
    return;
  };
  render() {
    return (
      <EmailFormUI
        {...this.props}
        download={this.download}
        print={this.print}
        getInputs={this.getInputs}
        to={this.state.to}
        subject={this.state.subject}
        body={this.state.body}
        name={this.state.name}
      />
    );
  }
}

export default EmailForm;

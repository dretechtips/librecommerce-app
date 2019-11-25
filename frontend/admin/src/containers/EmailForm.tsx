import React, { Component } from "react";
import ReactDOM from "react-dom";
import Form from "./Form";
import EmailFormUI from "../components/EmailForm";
import {
  EmailFormProps,
  EamilFormState,
  EmailFormQuestions
} from "../interface/EmailForm.interface";
import PDFService from "../service/pdf.service";

export class EmailForm extends Component<EmailFormProps, EamilFormState> {
  constructor(props: EmailFormProps) {
    super(props);
    this.state = {
      to: null,
      name: null,
      subject: null,
      body: null
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

  private generatePDF = async (): Promise<PDFService | null> => {
    if (this.state.name === null || this.state.body === null) return null;
    const doc: PDFService = new PDFService("portrait", "letter");
    doc.setMargin(50);
    doc.addImagef(
      await this.imageToDataURI(this.props.logoURL),
      "PNG",
      "center",
      0,
      110,
      100,
      "logo",
      "FAST"
    );
    doc.textf(
      [
        "Dear " + this.state.name,
        "",
        this.state.body,
        "",
        "X________________",
        "Signature",
        "X________________",
        "Note: Any letter created without a supervisor signature is considered to be voided and invalid."
      ],
      150
    );
    console.log(doc);
    return doc;
  };
  public print = async (): Promise<void> => {};
  public download = async (): Promise<void> => {
    const pdf: PDFService | null = await this.generatePDF();
    if (pdf === null) {
      alert("No name and body provided to generate an email.");
      return;
    } else pdf.docs.save("Client_Generated_PDF_" + new Date() + ".pdf");
  };
  private getInputs = (inputs: { [K in keyof EmailFormQuestions]: string }) => {
    this.setState({
      ...this.state,
      to: inputs.to,
      subject: inputs.subject,
      body: inputs.body,
      name: inputs.name
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

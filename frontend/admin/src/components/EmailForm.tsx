import React from "react";
import Form from "../containers/Form";
import Card from "./Card";
import { FormQuestion, FormRelation } from "../interface/Form.interface";
import {
  EmailFormUIProps,
  EmailFormQuestions
} from "../interface/EmailForm.interface";
import Button from "./Button";

function EmailForm(props: EmailFormUIProps) {
  const questions: FormRelation<EmailFormQuestions> = {
    to: { question: "To", input: "email" },
    name: { question: "Name", input: "text" },
    subject: { question: "Subject", input: "text" },
    body: { question: "Compose Email", input: "textarea" }
  };
  return (
    <Card theme={"success"} title={"Compose New Email"}>
      <div className="row mb-3">
        <div className="col-12">
          <Button
            icon={"fas fa-file-download"}
            value={"Download"}
            color={"success"}
            action={() => props.download()}
          />
        </div>
      </div>
      <Form modifier={"write"} questions={questions} inputs={props.getInputs} />
      <span className="text-sm text-muted">
        <span className="font-weight-bold">Remember</span>: Every email will be
        sent from your account based email. All email will be monitored and
        verified before being sent and cannot be retracted once sent. Every
        email you sent can and will be retraced to this account if needed by any
        administrator.
      </span>
    </Card>
  );
}

export default EmailForm;

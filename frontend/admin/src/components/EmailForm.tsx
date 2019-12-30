import React from "react";
import Form from "../containers/Form";
import Card from "./Card";
import { FormRelation } from "../interface/Form.interface";
import {
  EmailFormUIProps,
  EmailFormQuestions
} from "../interface/EmailForm.interface";
import Button from "./Button";
import FormField from "./FormField";

function EmailForm(props: EmailFormUIProps) {
  const questions: FormRelation<EmailFormQuestions> = {
    to: new FormField({ question: { label: "To", input: "email" } }),
    name: new FormField({ question: { label: "Name", input: "text" } }),
    subject: new FormField({ question: { label: "Subject", input: "text" } }),
    body: new FormField({
      question: { label: "Compose Email", input: "textarea" }
    })
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
      <Form
        fields={{
          questions,
          modifier: "write"
        }}
        inputs={props.getInputs}
        title={"Compose New Email"}
      />
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

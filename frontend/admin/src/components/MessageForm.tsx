import React from "react";
import {
  MessageFormUIProps,
  MessageFormQuestions
} from "../interface/MessageForm.interface";
import Card from "./Card";
import Form from "../containers/Form";

function MessageForm(props: MessageFormUIProps) {
  return (
    <Card theme="success" title="Compose new message">
      <Form
        fields={{
          questions: props.questions,
          modifier: "write"
        }}
        title={"Compose new Message"}
      />
      <span className="text-sm text-muted">
        <span className="font-weight-bold">Remember</span>: Every message will
        be sent from your account. All email will be monitored and cannot be
        retracted once sent. Every message you send can and will be retraced to
        this account if needed by any administrator.
      </span>
    </Card>
  );
}

export default MessageForm;

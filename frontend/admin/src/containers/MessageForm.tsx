import React, { Component } from "react";
import {
  MessageFormProps,
  MessageFormState,
  MessageFormQuestions
} from "../interface/MessageForm.interface";
import MessageFormUI from "../components/MessageForm";
import { FormRelation } from "../interface/Form.interface";
import FormField from "../components/FormField";

export class MessageForm extends Component<MessageFormProps, MessageFormState> {
  constructor(props: MessageFormProps) {
    super(props);
    this.state = {
      accountID: null,
      subject: "",
      body: ""
    };
  }
  public questions: FormRelation<MessageFormQuestions> = {
    accountID: new FormField({ question: { label: "Account", input: "text" } }),
    subject: new FormField({ question: { label: "Subject", input: "text" } }),
    body: new FormField({
      question: { label: "Compose Message", input: "textarea" }
    })
  };
  render() {
    return (
      <MessageFormUI
        {...this.props}
        subject={this.state.subject}
        body={this.state.body}
        questions={this.questions}
      />
    );
  }
}

export default MessageForm;

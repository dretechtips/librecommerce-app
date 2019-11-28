import React, { Component } from "react";
import {
  MessageFormProps,
  MessageFormState,
  MessageFormQuestions
} from "../interface/MessageForm.interface";
import MessageFormUI from "../components/MessageForm";
import { FormRelation } from "../interface/Form.interface";

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
    accountID: { question: "Account", input: "text" },
    subject: { question: "Subject", input: "text" },
    body: { question: "Compose Message", input: "textarea" }
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

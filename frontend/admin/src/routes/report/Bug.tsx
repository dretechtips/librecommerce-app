import React, { Component } from 'react';
import Form from "../../containers/Form";
import { FormQuestion } from '../../interface/Form.interface';
import Card from '../../components/Card';
import { Button } from '../../components/Button';

export class Bug extends Component {
  private _questions: FormQuestion[];
  constructor() {
    super({});
    this._questions = [
      {question: "Descriptive title", input: "text"},
      {question: "Issue Category", input: "select", options: ["UI Issue", "UX Issue", "Server Issue"]},
      {question: "Server generated code", input: "text", placeholder: "IF APPLICABLE"},
      {question: "Server generated message", input: "text", placeholder: "IF APPLICABLE"},
      {question: "Steps to reproduce bug", input: "textarea-list"},
      {question: "How often does this happen?", input: "textarea"},
      {question: "When did you start to experience this problem?", input: "date"},
      {question: "Build Type", input: "select", options: ["Development", "Testing", "Production"]}
    ]
  }
  send = (inputs: any[]) => {
    // Http Method to server
    console.log("Create");
  }
  render() {
    return (
      <Card title="Send New Bug Report" theme="success">
        <Form modifier="write" questions={this._questions} submit={this.send} />
      </Card>
    )
  }
}

export default Bug

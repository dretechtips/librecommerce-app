import React, { Component } from 'react';
import { Form } from "../components/Form";
import { FormProps, FormState } from '../interface/Form.interface';

export class FormContainer extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
      modifier: this.props.modifier,
    }
  }
  render() {
    return (
      <Form modifier={this.state.modifier} questions={this.props.questions} />
    )
  }
}

export default Form

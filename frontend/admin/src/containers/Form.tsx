import React, { Component } from 'react';
import FormUI from "../components/Form";
import { FormProps, FormState } from '../interface/Form.interface';

export class Form extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
      modifier: this.props.modifier,
    }
  }
  render() {
    return (
      <FormUI questions={this.props.questions} modifier={this.props.modifier} submit={this.props.submit} />
    )
  }
}

export default Form

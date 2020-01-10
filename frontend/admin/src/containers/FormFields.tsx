import React, { Component } from "react";
import {
  FormFieldsProps,
  FormFieldsState
} from "../interface/FormFields.interface";
import FormFieldsUI from "../components/FormFields";

export class FormFields<T> extends Component<
  FormFieldsProps<T>,
  FormFieldsState<T>
> {
  constructor(props: FormFieldsProps<T>) {
    super(props);
    this.state = {
      modifier: this.props.modifier,
      loading: false
    };
  }
  public render() {
    const questions = this.props.questions;
    return <FormFieldsUI {...this.props} />;
  }
}

export default FormFields;

import React, { Component } from "react";
import {
  FormFieldsProps,
  FormFieldsState
} from "../interface/FormFields.interface";
import { Tree, Leaf, Branch } from "../data/Tree";
import FormField from "../components/FormField";
import FormFieldGroup from "../components/FormFieldGroup";
import { FormRelation, FormCleared } from "../interface/Form.interface";
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
    Object.keys(questions).forEach(key =>
      console.log(key, questions[key as keyof typeof questions])
    );
    return <FormFieldsUI {...this.props} />;
  }
}

export default FormFields;

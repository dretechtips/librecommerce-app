import React, { Component } from "react";
import FormUI from "../components/Form";
import {
  FormProps,
  FormState,
  FormRelation,
  FormQuestion,
  Primitives
} from "../interface/Form.interface";
import { Loading } from "../components/Loading";

export class Form<T = any> extends Component<FormProps<T>, FormState<T>> {
  constructor(props: FormProps<T>) {
    super(props);
    this.state = {
      modifier: this.props.modifier,
      values: this.objectToValue(this.props.questions),
      loading: false,
      success: false
    };
  }
  private objectToValue(
    questions: FormRelation<T> | FormQuestion[]
  ): { [K in keyof T]: any } {
    const values: any = {};
    for (let key in questions) {
      if (Array.isArray(values[key]) || typeof values[key] !== "object")
        values[key] = null;
      else for (let key2 in values[key]) values[key][key2] = null;
    }
    return values;
  }
  private onInput = (
    key: keyof T,
    key2: keyof T[keyof T] | undefined,
    value: any
  ) => {
    if (this.props.inputs)
      this.props.inputs({ ...this.state.values, [key]: value });
    if (key2 !== undefined) {
      this.setState({
        ...this.state,
        values: {
          ...this.state.values,
          [key]: { ...this.state.values[key], value }
        }
      });
    } else {
      this.setState({
        ...this.state,
        values: { ...this.state.values, [key]: value }
      });
    }
  };
  submit = async (inputs: { [K in keyof T]: any }): Promise<void> => {
    if (
      this.props.submit &&
      Object.keys(inputs).filter(key => inputs[key as keyof T] !== undefined)
        .length === Object.keys.length
    ) {
      const submit = this.props.submit(inputs);
      this.setState({ ...this.state, loading: true });
      const result = await submit;
      if (result.data.error)
        this.setState({
          ...this.state,
          error: result.data.error as string,
          loading: false
        });
      else
        this.setState({
          ...this.state,
          success: true,
          loading: false,
          error: undefined
        });
    } else {
      this.setState({
        ...this.state,
        error: "Cannot send a form with invalid or empty values."
      });
    }
  };
  render() {
    if (this.state.loading) return <Loading />;
    else
      return (
        <FormUI
          onInput={this.onInput}
          questions={this.props.questions}
          modifier={this.props.modifier}
          submit={this.props.submit ? this.submit : undefined}
          values={this.state.values}
          success={this.state.success}
          error={this.state.error}
        />
      );
  }
}

export default Form;

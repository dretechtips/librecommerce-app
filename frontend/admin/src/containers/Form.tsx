import React, { Component } from "react";
import FormUI from "../components/Form";
import {
  FormProps,
  FormState,
  FormRelation,
  FormCleared
} from "../interface/Form.interface";
import { Loading } from "../components/Loading";
import { Tree, Leaf, Branch } from "../data/Tree";
import FormField from "../components/FormField";
import FormFieldGroup from "../components/FormFieldGroup";

/**
 * @todo Fix the brokne inital state of nested form objects
 * @todo Fix the brokwn changed state of nested form objects
 */

export class Form<T = any> extends Component<FormProps<T>, FormState<T>> {
  constructor(props: FormProps<T>) {
    super(props);
    this.state = {
      error: undefined,
      success: false,
      values: this.toDefaultValues<T>(props.fields.questions)
    };
    console.log("Form inital state", this.state.values);
  }
  private toDefaultValues<T>(questions: FormRelation<T>): FormCleared<T> {
    let values = { ...questions };
    Object.keys(values).forEach(key => {
      let cur: any = values[key as keyof FormRelation<T>];
      if (cur instanceof FormField) {
        values = { ...values, [key]: undefined };
      } else if (cur instanceof FormFieldGroup) {
        values = { ...values, [key]: this.toDefaultValues(cur.questions()) };
      }
    });
    return (values as unknown) as FormCleared<T>;
  }
  private onInput = (sNode: string, sParent: string | null, value: any) => {
    console.log(sNode, sParent, value);
    if (!sParent) {
      this.setState({
        ...this.state,
        values: { ...this.state.values, [sNode as keyof T]: value }
      });
      return;
    }
    const tree: Tree = new Tree(this.state.values);
    console.log("tree", tree);
    tree.traverselDF((node, parent, level) => {
      if (parent != null && parent.getName() === sParent) {
        const children = parent.getChildren(sNode);
        if (children instanceof Leaf) {
          parent.replace(children, new Leaf(value, level));
        }
      }
    });
    this.setState({
      ...this.state,
      values: tree.toObject() as { [K in keyof T]: any }
    });
    return;
  };
  public submit = async (): Promise<void> => {
    if (this.props.submit) {
      const submit = this.props.submit(this.state.values);
      this.setState({ ...this.state });
      const result = await submit;
      if (result.data.error)
        this.setState({
          ...this.state,
          error: result.data.error as string
        });
      else
        this.setState({
          ...this.state,
          success: true,
          error: undefined
        });
    } else {
      this.setState({
        ...this.state,
        error: "Cannot send a form with invalid or empty values."
      });
    }
  };
  public componentDidUpdate() {
    console.log("Form New State", this.state.values);
  }
  public render() {
    const question = this.props.fields.questions;
    return (
      <FormUI
        {...this.props}
        onInput={this.onInput}
        submit={this.props.submit ? this.submit : undefined}
        success={this.state.success}
        error={this.state.error}
      />
    );
  }
}

export default Form;

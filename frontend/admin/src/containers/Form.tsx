import React, { Component } from "react";
import FormUI from "../components/Form";
import {
  FormProps,
  FormState,
  FormRelation,
  FormCleared
} from "../interface/Form.interface";
import { Loading } from "../components/Loading";
import { Tree, Leaf } from "../data/Tree";

export class Form<T = any> extends Component<FormProps<T>, FormState<T>> {
  constructor(props: FormProps<T>) {
    super(props);
    this.state = {
      modifier: this.props.modifier,
      values: this.toDefaultValues(this.props.questions),
      loading: false,
      success: false
    };
  }
  private toDefaultValues(questions: FormRelation<T>): FormCleared<T> {
    const tree: Tree = new Tree(questions);
    tree.clearLeafs();
    return tree.toObject() as FormCleared<T>;
  }
  private onInput = (nodeName: string, parentName: string, value: any) => {
    const tree: Tree = new Tree(this.state.values);
    tree.traverselDF((node, parent, level) => {
      const children = parent.getChildren(nodeName);
      if (children instanceof Leaf) node = new Leaf<any>(value, level);
    });
    this.setState({
      ...this.state,
      values: tree.toObject() as { [K in keyof T]: any }
    });
  };
  public submit = async (inputs: { [K in keyof T]: any }): Promise<void> => {
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
  public render() {
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

import React, { Component } from "react";
import FormUI from "../components/Form";
import {
  FormProps,
  FormState,
  FormRelation,
  FormCleared,
  copyFormRelation
} from "../interface/Form.interface";
import { Loading } from "../components/Loading";
import { Tree, Leaf, Branch } from "../data/Tree";
import FormField from "../components/FormField";
import FormFieldGroup from "../components/FormFieldGroup";

export class Form<T = any> extends Component<FormProps<T>, FormState<T>> {
  constructor(props: FormProps<T>) {
    super(props);
    this.state = {
      error: undefined,
      success: false,
      values: this.toDefaultValues(props.fields.questions)
    };
  }
  private toDefaultValues(questions: FormRelation<T>): FormCleared<T> {
    const copy = copyFormRelation(questions);
    const tree: Tree = new Tree(copy);
    // const tree: Tree = new Tree(questions);
    console.log("Tree Before Modification", tree);
    tree.traverselDF((node, parent, level) => {
      if (node instanceof Branch) {
        const object: Object = node.toObject();
        if (object instanceof FormField) {
          // console.log("Object is instance of FormField");
          if (parent) {
            parent.replace(node, new Leaf<undefined>(undefined, level));
            // console.log(
            //   "FormField ",
            //   parent.replace(node, new Leaf<undefined>(undefined, level))
            // );
          }
        }
        if (object instanceof FormFieldGroup) {
          if (parent) {
            parent.replace(node, new Leaf(object.questions(), level));
            // console.log("FormFieldGroup ", parent);
          }
        }
      }
    });
    console.log("Tree After Modification", tree);
    console.log(
      "Question Props After Modification",
      this.props.fields.questions
    );
    return tree.toObject() as FormCleared<T>;
  }
  private onInput = (sNode: string, sParent: string | null, value: any) => {
    if (!sParent) {
      this.setState({
        ...this.state,
        values: { ...this.state.values, [sNode as keyof T]: value }
      });
      return;
    }
    const tree: Tree = new Tree(this.state.values);
    tree.traverselDF((node, parent, level) => {
      if (parent != null) {
        const children = parent.getChildren(sNode);
        if (children instanceof Leaf) node = new Leaf<any>(value, level);
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
    console.log("Form Component Updated", this.state.values);
  }
  public render() {
    const question = this.props.fields.questions;
    // Object.keys(question).forEach(key => {
    //   if (question[key as keyof FormRelation<T>] instanceof FormFieldGroup) {
    //     console.log(
    //       key,
    //       (question[key as keyof FormRelation<T>] as FormFieldGroup<
    //         any
    //       >).questions()
    //     );
    //   }
    // });
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

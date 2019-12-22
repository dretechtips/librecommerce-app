import React from "react";
import { FormInputGroupProps } from "../interface/FormInputGroup.interface";
import { FormRelation } from "../interface/Form.interface";

export function rQuestions(
  props: Omit<FormInputGroupProps<any>, "category">
): JSX.Element[] {
  const display: JSX.Element[] = [];
  for (const key in props.questions) {
    if (props.questions[key] instanceof FormQuestion) {
      const cur: FormQuestion = props.questions[key] as FormQuestion;
      display.push(cur.toFormInput({ modifier: props.modifier }));
    }
  }
  for (const key in props.questions) {
    if (props.questions[key] instanceof FormQuestionGroup) {
      const cur: FormQuestionGroup<any> = props.questions[
        key
      ] as FormQuestionGroup<any>;

      display.push(
        cur.toFormInputGroup({ ...props, modifier: props.modifier })
      );
    }
  }
  return display;
}

class FormInputGroup<T> extends React.PureComponent<FormInputGroupProps<T>> {
  public render() {
    if (!this.props.level)
      return (
        <div>
          <h3 className="bg-warning">{this.props.category}</h3>
          {rQuestions(this.props)}
        </div>
      );
    else {
      return (
        <div>
          <h3>
            <u>{this.props.category}</u>
          </h3>
          {rQuestions(this.props)}
        </div>
      );
    }
  }
}

export default FormInputGroup;

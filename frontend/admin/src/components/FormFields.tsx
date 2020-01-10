import React from "react";
import { FormFieldsUIProps } from "../interface/FormFields.interface";
import FormField from "./FormField";
import FormFieldGroup from "./FormFieldGroup";
import { Tree } from "../data/Tree";
import Card from "./Card";

function FormFields<T>(props: FormFieldsUIProps<T>): JSX.Element {
  const standard: JSX.Element[] = [];
  const group: JSX.Element[] = [];
  const checkboxs: JSX.Element[] = [];
  // console.log("props.questions", props.questions);
  Object.keys(props.questions).forEach(key => {
    const field: FormFieldGroup<any> | FormField =
      props.questions[key as keyof typeof props.questions];
    if (field instanceof FormField) {
      if ((field as FormField).question().input === "checkbox") {
        checkboxs.push(
          field.use({
            ...props,
            node: key,
            parent: props.parent ? props.parent : null
          })
        );
      } else {
        standard.push(
          field.use({
            ...props,
            node: key,
            parent: props.parent ? props.parent : null
          })
        );
      }
    } else if (field instanceof FormFieldGroup) {
      //console.log("FormFieldGroup ", field);
      group.push(
        field.use({
          ...props,
          node: key
        })
      );
    }
  });
  return (
    <React.Fragment>
      {[
        !props.parent ? (
          <Card theme="success" title="Details">
            {[...standard, ...checkboxs]}
          </Card>
        ) : (
          <React.Fragment>{[...standard, ...checkboxs]}</React.Fragment>
        ),
        ...group
      ]}
    </React.Fragment>
  );
}

export default FormFields;

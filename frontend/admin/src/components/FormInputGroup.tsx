import React from "react";
import { FormInputGroupProps } from "../interface/FormInputGroup.interface";
import { FormRelation } from "../interface/Form.interface";
import FormFields from "./FormFields";
import Card from "../components/Card";

class FormInputGroup<T> extends React.PureComponent<FormInputGroupProps<T>> {
  public render() {
    return (
      <Card title={this.props.category} theme="success">
        <FormFields {...this.props} parent={this.props.node} />
      </Card>
    );
  }
}

export default FormInputGroup;

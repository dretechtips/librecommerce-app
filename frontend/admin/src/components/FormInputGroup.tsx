import React from "react";
import { FormInputGroupProps } from "../interface/FormInputGroup.interface";
import { FormRelation } from "../interface/Form.interface";
import FormFields from "./FormFields";
import Card from "../components/Card";
import FormField from "./FormField";
import FormFieldGroup from "./FormFieldGroup";
import * as ObjectUtil from "../utils/ObjectUtil";
import { ExtractPrimitives, ExtractObjects } from "../utils/Types";

class FormInputGroup<T> extends React.PureComponent<FormInputGroupProps<T>> {
  public render() {
    //return <FormFields {...this.props} parent={this.props.node} />;
    const fields = ObjectUtil.extract<FormRelation<ExtractPrimitives<T>>>(
      this.props.questions as FormRelation<T>,
      [FormField]
    );
    const fieldGroups = ObjectUtil.extract<FormRelation<ExtractObjects<T>>>(
      this.props.questions as FormRelation<T>,
      [FormFieldGroup]
    );
    return (
      <React.Fragment>
        <Card title={this.props.category} theme="success">
          <FormFields
            {...this.props}
            questions={fields}
            parent={this.props.node}
          />
        </Card>
        <FormFields
          {...this.props}
          questions={fieldGroups}
          parent={this.props.node}
        />
      </React.Fragment>
    );
  }
}

export default FormInputGroup;

import DeferProps from "../factory/DeferProps";
import FormInputGroup from "./FormInputGroup";
import { FormInputGroupProps } from "../interface/FormInputGroup.interface";

export class FormFieldGroup<T> extends DeferProps<
  FormInputGroup<T>,
  "questions" | "category"
> {
  protected WrappedComponent = FormInputGroup;
  public questions() {
    return this.props.questions;
  }
}

export default FormFieldGroup;

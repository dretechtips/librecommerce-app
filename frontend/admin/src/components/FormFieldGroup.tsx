import DeferProps from "../factory/DeferProps";
import FormInputGroup from "./FormInputGroup";
import { FormRelation } from "../interface/Form.interface";

export class FormFieldGroup<T> extends DeferProps<
  FormInputGroup<T>,
  "questions" | "category"
> {
  protected WrappedComponent = FormInputGroup;
  public questions(): FormRelation<T> {
    return this.props.questions;
  }
  public category() {
    return this.props.category;
  }
}

export default FormFieldGroup;

import DeferProps from "../factory/DeferProps";
import FormInputGroup from "./FormInputGroup";

export class FormFieldGroup<T> extends DeferProps<
  FormInputGroup<T>,
  "questions" | "category"
> {
  protected WrappedComponent = FormInputGroup;
  public questions() {
    return JSON.parse(JSON.stringify(this.props.questions));
  }
  public category() {
    return this.props.category;
  }
}

export default FormFieldGroup;

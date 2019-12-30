import FormInput from "./FormInput";
import DeferProps from "../factory/DeferProps";

export class FormField extends DeferProps<FormInput, "question"> {
  protected WrappedComponent = FormInput;
  public question() {
    return JSON.parse(JSON.stringify(this.props.question));
  }
}

export default FormField;

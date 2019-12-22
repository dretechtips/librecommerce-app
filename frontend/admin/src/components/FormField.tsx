import FormInput from "./FormInput";
import DeferProps from "../factory/DeferProps";

export class FormField extends DeferProps<FormInput, "question"> {
  protected WrappedComponent = FormInput;
  public getQuestions() {
    return this.props.question;
  }
}

export default FormField;

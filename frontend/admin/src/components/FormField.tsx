import FormInput from "./FormInput";
import DeferProps from "../factory/DeferProps";
import rfdc from "rfdc";
import { FormQuestionProps } from "../interface/Form.interface";

export class FormField extends DeferProps<FormInput, "question"> {
  protected WrappedComponent = FormInput;
  public question() {
    return rfdc({ proto: false })(this.props.question);
  }
}

export default FormField;

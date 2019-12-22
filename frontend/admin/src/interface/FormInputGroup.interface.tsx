import {
  FormRelation,
  FormQuestionGroupProps,
  FormModifier
} from "../interface/Form.interface";

export interface FormInputGroupProps<T> extends FormQuestionGroupProps<T> {
  level?: number;
  modifier: FormModifier;
}

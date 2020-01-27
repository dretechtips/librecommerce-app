import { Injectable, Scope } from "@nestjs/common";
import { Form } from "src/interface/Form.interface";

@Injectable({ scope: Scope.REQUEST })
class FormService {
  private static Store: Map<string, Form<any>> = new Map();
  public static readonly Add = function(form: Form<any>) {
    if (!form.title) {
      FormService.Store.set(form.title, form);
      return;
    }
    console.log(
      "System was unable to add the form with the title " + form.title
    );
  };
  private forms: Form<any>[];
  public add<T>(form: Form<any>) {
    this.forms.push(form);
  }
}

export default FormService;

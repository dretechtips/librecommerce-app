import { FormUIProps, FormRelation } from "../interface/Form.interface";
import React, { useRef, MutableRefObject } from "react";
import Button from "../components/Button";
import Alert from "./Alert";
import { scrollToTop } from "../utils/Element";
import FormFields from "../containers/FormFields";
import Card from "./Card";
import * as StringUtil from "../utils/String";

function Form<T>(props: FormUIProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  function submit(ref: MutableRefObject<HTMLDivElement>) {
    scrollToTop(ref);
    if (props.submit) props.submit();
  }
  // Object.keys(props.fields.questions).forEach(key =>
  //   console.log(key, props.fields.questions[key as keyof FormRelation<T>])
  // );
  return (
    <React.Fragment>
      <Card theme="success" border="success">
        <h2 className="text-center">{StringUtil.toName(props.title)}</h2>
        <div className="mt-3" ref={ref}>
          {props.success && (
            <Alert
              message="The form has recorded the response successfully!"
              theme="success"
              dismissable
            />
          )}
          {props.error && (
            <Alert message={props.error} theme="danger" dismissable />
          )}
          {props.note && <span>{props.note}</span>}
        </div>
      </Card>
      <FormFields {...props.fields} onInput={props.onInput} />
      {props.submit && (
        <div className="form-group">
          <Button
            value="Submit"
            color="primary"
            action={() => submit(ref as React.MutableRefObject<HTMLDivElement>)}
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default Form;

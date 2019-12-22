import { FormUIProps, FormRelation } from "../interface/Form.interface";
import React, { useRef, MutableRefObject } from "react";
import Button from "../components/Button";
import Alert from "./Alert";
import { rQuestions } from "../components/FormInputGroup";
import { scrollToTop } from "../utils/Element";

function Form<T>(props: FormUIProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  function inputCallback(
    e: React.FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    key: keyof T,
    key2?: keyof T[keyof T]
  ): void {
    props.onInput(key, key2, e.currentTarget.value);
  }
  function submit(ref: MutableRefObject<HTMLDivElement>) {
    scrollToTop(ref);
    if (props.submit) props.submit(props.values);
  }
  const display = () =>
    rQuestions({ modifier: props.modifier, questions: props.questions });
  return (
    <div ref={ref}>
      {props.success ? (
        <Alert
          message="The form has recorded the response successfully!"
          dismissable
          theme="success"
        />
      ) : (
        ""
      )}
      {props.error ? (
        <Alert message={props.error} dismissable theme="danger" />
      ) : (
        ""
      )}
      {display()}
      {/* {Array.isArray(props.questions)
        ? props.questions.map((cur, index) => display(cur, index as keyof T))
        : Object.keys(props.questions).map((key, index) => {
            if (
              isFormGroup((props.questions as FormRelation<T>)[key as keyof T])
            ) {
              return (
                <div>
                  <h2 className="mb-3 bg-warning p-2">
                    {
                      ((props.questions as FormRelation<T>)[
                        key as keyof T
                      ] as FormGroup<T[keyof T]>).category
                    }
                  </h2>
                  {Object.keys(
                    ((props.questions as FormRelation<T>)[
                      key as keyof T
                    ] as FormGroup<T[keyof T]>).questions
                  ).map((key2, index) => {
                    return display(
                      ((props.questions as FormRelation<T>)[
                        key as keyof T
                      ] as FormGroup<T[keyof T]>).questions[
                        key2 as keyof T[keyof T]
                      ] as FormQuestion,
                      key as keyof T,
                      key2 as keyof T[keyof T]
                    );
                  })}
                  <hr className="mt-5" />
                </div>
              );
            } else {
              return (
                <React.Fragment>
                  {display(
                    (props.questions as FormRelation<T>)[
                      key as keyof T
                    ] as FormQuestion,
                    key as keyof T
                  )}
                </React.Fragment>
              );
            }
          })} */}
      {props.submit ? (
        <div className="form-group">
          <Button
            value="Submit"
            color="primary"
            action={() => submit(ref as React.MutableRefObject<HTMLDivElement>)}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Form;

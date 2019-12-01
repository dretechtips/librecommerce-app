import {
  FormUIProps,
  FormRelation,
  FormQuestion,
  isFormGroup,
  FormGroup,
  FormInputType
} from "../interface/Form.interface";
import React, { useRef, MutableRefObject } from "react";
import Button from "../components/Button";
import TextAreaList from "../components/TextBoxList";
import Alert from "./Alert";
import BarcodeScannerBox from "../containers/BarcodeScannerBox";
import FileUpload from "../containers/FileUpload";
import PhotoUpload from "../containers/PhotoUpload";
import TagsBox from "../containers/TagsBox";
import PasswordInput from "../containers/PasswordInput";
import StreetAddressInput from "../containers/StreetAddressInput";
import EmailAddressInput from "../containers/EmailAddressInput";
import Checkbox from "./Checkbox";
import DateRangeInput from "../containers/DateRangeInput";

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
  function scrollToTop(ref: MutableRefObject<HTMLDivElement>): void {
    const wrapper: Element | null = ref.current.offsetParent;
    if (wrapper) wrapper.scrollIntoView({ behavior: "smooth", block: "start" });
    else ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function submit(ref: MutableRefObject<HTMLDivElement>) {
    scrollToTop(ref);
    if (props.submit) props.submit(props.values);
  }
  function display(cur: FormQuestion, key: keyof T, key2?: keyof T[keyof T]) {
    let el: JSX.Element = <div></div>;
    switch (cur.input) {
      case "text":
        el = (
          <input
            type="text"
            className="form-control"
            readOnly={props.modifier === "read" ? true : false}
            onInput={e => inputCallback(e, key, key2)}
            placeholder={cur.props ? cur.props.placeholder : undefined}
            value={cur.props ? cur.props.value : undefined}
          />
        );
        break;
      case "textarea":
        el = (
          <textarea
            className="form-control"
            readOnly={props.modifier === "read" ? true : false}
            onInput={e => inputCallback(e, key, key2)}
            placeholder={cur.props!.placeholder}
            value={cur.props!.value}
          />
        );
        break;
      case "checkbox":
        el = (
          <Checkbox
            onInput={e => inputCallback(e, key, key2)}
            label={cur.question}
            readOnly={props.modifier === "read" ? true : false}
            checked={cur.props!.value ? cur.props!.value : false}
          />
        );
        break;
      case "date":
        el = (
          <input
            type="text"
            className="form-control"
            readOnly={props.modifier === "read" ? true : false}
            onInput={e => inputCallback(e, key, key2)}
            value={cur.props!.date ? cur.props!.date!.toString() : undefined}
          />
        );
        break;
      case "select":
        el = (
          <select
            className="form-control"
            disabled={props.modifier === "read" ? true : false}
            onInput={e => inputCallback(e, key, key2)}
          >
            {cur.props &&
              cur.props.option &&
              cur.props.option.map((option, index) => (
                <option
                  value={option}
                  selected={
                    cur.props!.selected
                      ? cur.props!.selected === index
                      : undefined
                  }
                >
                  {option}
                </option>
              ))}
          </select>
        );
        break;
      case "textarea-list":
        el = (
          <TextAreaList
            className="form-control"
            readOnly={props.modifier === "read" ? true : false}
            onInput={e => inputCallback(e, key, key2)}
            rows={cur.props!.rows}
            placeholder={cur.props!.placeholder}
            value={cur.props!.value}
            list={cur.props!.list}
          />
        );
        break;
      case "date-range":
        el = (
          <DateRangeInput
            start={cur.props!.start}
            end={cur.props!.end}
            readOnly={props.modifier === "read" ? true : false}
            onInput={e => inputCallback(e, key, key2)}
          />
        );
        break;
      case "barcode":
        el = (
          <BarcodeScannerBox
            value={cur.props!.code}
            onInput={e => inputCallback(e, key, key2)}
          />
        );
        if (cur.props) break;
      case "file":
        el = <FileUpload message="Please upload the files into here." />;
        break;
      case "photo":
        el = <PhotoUpload onInput={} readOnly={} />;
        break;
      case "tagsbox":
        el = <TagsBox onInput={} readOnly={} />;
        break;
      case "password":
        el = <PasswordInput />;
        break;
      case "address":
        el = <StreetAddressInput onInput={e => inputCallback(e, key, key2)} />;
        break;
      case "email":
        el = <EmailAddressInput onInput={e => inputCallback(e, key, key2)} />;
        break;
      default:
        el = (
          <input
            type="text"
            className="form-control"
            readOnly={true}
            placeholder={
              "Production Error: If this pass through development build, report this as a bug ASAP!"
            }
          />
        );
        break;
    }
    return (
      <div className="form-group">
        <label htmlFor="">{cur.question}</label>
        {el}
      </div>
    );
  }
  return (
    <div ref={ref}>
      {props.success ? (
        <Alert
          message="The form has recorded the response SUCCESSFULLY!"
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
      {Array.isArray(props.questions)
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
          })}
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

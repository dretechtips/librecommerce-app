import React from "react";
import { FormInputProps } from "../interface/FormInput.interface";
import BarcodeScannerBox from "../containers/BarcodeScannerBox";
import FileUpload from "../containers/FileUpload";
import PhotoUpload from "../containers/PhotoUpload";
import TagsBox from "../containers/TagsBox";
import PasswordInput from "../containers/PasswordInput";
import StreetAddressInput from "../containers/StreetAddressInput";
import EmailAddressInput from "../containers/EmailAddressInput";
import Checkbox from "./Checkbox";
import DateRangeInput from "../containers/DateRangeInput";
import TextBoxList from "../components/TextBoxList";

class FormInput extends React.PureComponent<FormInputProps> {
  public render() {
    const question = this.props.question;
    let el: JSX.Element = <div></div>;
    switch (question.input) {
      case "text":
        el = (
          <input
            type="text"
            className="form-control"
            readOnly={this.props.modifier === "read" ? true : false}
            onInput={e => inputCallback(e, key, key2)}
            placeholder={
              question.props ? question.props!.placeholder : undefined
            }
            value={question.props ? question.props!.value : undefined}
          />
        );
        break;
      case "textarea":
        el = (
          <textarea
            className="form-control"
            readOnly={this.props.modifier === "read" ? true : false}
            onInput={e => inputCallback(e, key, key2)}
            placeholder={
              question.props ? question.props!.placeholder : undefined
            }
            value={question.props ? question.props!.value : undefined}
          />
        );
        break;
      case "checkbox":
        el = (
          <Checkbox
            label={question.label}
            onInput={e => inputCallback(e, key, key2)}
            readOnly={this.props.modifier === "read" ? true : false}
            checked={question.props ? props.question.props!.value : false}
          />
        );
        break;
      case "date":
        el = (
          <input
            type="text"
            className="form-control"
            readOnly={this.props.modifier === "read" ? true : false}
            onInput={e => inputCallback(e, key, key2)}
            value={
              question.props
                ? question.props!.date
                  ? question.props.date.toString()
                  : undefined
                : undefined
            }
          />
        );
        break;
      case "select":
        el = (
          <select
            className="form-control"
            disabled={this.props.modifier === "read" ? true : false}
            onInput={e => inputCallback(e, key, key2)}
          >
            {question.props &&
              question.props.option &&
              question.props.option.map((option, index) => (
                <option
                  value={option}
                  selected={
                    question.props
                      ? question.props!.selected === index
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
          <TextBoxList
            className="form-control"
            readOnly={this.props.modifier === "read" ? true : false}
            onInput={e => inputCallback(e, key, key2)}
            rows={question.props ? question.props!.rows : undefined}
            placeholder={
              question.props ? question.props!.placeholder : undefined
            }
            value={question.props ? question.props!.value : undefined}
            list={question.props ? question.props!.list : undefined}
          />
        );
        break;
      case "date-range":
        el = (
          <DateRangeInput
            start={question.props ? question.props!.start : undefined}
            end={question.props ? question.props!.end : undefined}
            readOnly={this.props.modifier === "read" ? true : false}
            onInput={e => onInput(key, key2, e)}
          />
        );
        break;
      case "barcode":
        el = (
          <BarcodeScannerBox
            value={question.props ? question.props!.code : undefined}
            onInput={e => inputCallback(e, key, key2)}
          />
        );
        break;
      case "file":
        el = (
          <FileUpload
            input={{
              readOnly: this.props.modifier === "read" ? true : false,
              onInput: e => inputCallback(e, key, key2)
            }}
            message="Please upload the files into here."
          />
        );
        break;
      case "photo":
        el = (
          <PhotoUpload
            photos={question.props ? question.props.photos : undefined}
            input={{
              readOnly: this.props.modifier === "read" ? true : false,
              onInput: e => inputCallback(e, key, key2)
            }}
          />
        );
        break;
      case "tagsbox":
        el = (
          <TagsBox
            tags={question.props ? question.props.tags : undefined}
            readOnly={this.props.modifier === "read" ? true : false}
            onChange={e => props.onInput(key, key2, e)}
          />
        );
        break;
      case "password":
        el = (
          <PasswordInput
            value={question.props ? question.props.value : undefined}
            readOnly={this.props.modifier === "read" ? true : false}
            onInput={e => inputCallback(e, key, key2)}
          />
        );
        break;
      case "address":
        el = (
          <StreetAddressInput
            value={question.props ? question.props.value : undefined}
            readOnly={this.props.modifier === "read" ? true : false}
            onInput={e => inputCallback(e, key, key2)}
          />
        );
        break;
      case "email":
        el = (
          <EmailAddressInput
            value={question.props ? question.props.value : undefined}
            readOnly={this.props.modifier === "read" ? true : false}
            onInput={e => inputCallback(e, key, key2)}
          />
        );
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
        <label htmlFor="">{this.props.question.label}</label>
        {el}
      </div>
    );
  }
}

export default FormInput;

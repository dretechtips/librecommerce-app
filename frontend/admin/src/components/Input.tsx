import React, { useState } from "react";
import {
  InputUIProps,
  InputMessage,
  InputGroup
} from "../interface/Input.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

function renderInputGroup(input: InputGroup[]): JSX.Element[] {
  return input.map(cur => {
    if (cur.type === "text") {
      return <span className="input-group-text">{cur.text}</span>;
    } else if (cur.type === "button") {
      return <Button color="success" value={cur.type} action={cur.action} />;
    } else {
      return <div></div>;
    }
  });
}

/**
 *
 * @param props Input Props
 * @typedef T Invalid State
 */
function Input<T extends {}>(props: InputUIProps<T>) {
  const [display, setDisplay] = useState(false);
  const [clicked, setClicked] = useState(false);
  return (
    <div>
      {/* <div className="input-group">
        {props.prepend &&
        <div className="input-group-prepend">
          {renderInputGroup(props.prepend)}
        </div>
        } */}
      <input
        type="text"
        className={
          "form-control " +
          (clicked === true
            ? props.valid.length === 0
              ? "is-valid"
              : "is-invalid"
            : "")
        }
        onChange={props.verify}
        value={props.value}
        onFocus={() => setDisplay(true)}
        onBlur={() => setDisplay(false)}
        onClick={() => setClicked(true)}
        onInput={props.onInput}
        placeholder={props.example}
      />
      {/* {props.append &&
          <div className="input-group-prepend">
          {renderInputGroup(props.append)}
        </div>}
      </div> */}
      {display && (
        <div className="text-sm">
          {props.valid.length === 0 ? (
            <span className="text-success">
              Client has successfully verify this {props.name.toLowerCase()}!
            </span>
          ) : (
            <React.Fragment>
              {Object.keys(props.invalid).map(key => {
                const cur: InputMessage = props.invalid[key as keyof T];
                if (props.valid.indexOf(key as keyof T) !== -1)
                  return (
                    <React.Fragment>
                      <span className="text-danger">
                        <FontAwesomeIcon icon={faCheck} fixedWidth />
                        {cur.fail}
                      </span>
                      <br />
                    </React.Fragment>
                  );
                else
                  return (
                    <React.Fragment>
                      <span className="text-success">
                        <FontAwesomeIcon icon={faTimes} fixedWidth />
                        {cur.success}
                      </span>
                      <br />
                    </React.Fragment>
                  );
              })}
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
}

export default Input;

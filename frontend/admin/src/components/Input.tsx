import React, { useState } from "react";
import {
  InputUIProps,
  InputMessage,
  InputGroup
} from "../interface/Input.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

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
      <div className="input-group">
        <input
          readOnly={props.readOnly}
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
        <div className="input-group-append">
          {props.buttons &&
            props.buttons.map(props => (
              <button className="input-group-text" onClick={props.action}>
                {props.icon && <i className={props.icon}></i>}
                {props.value}
              </button>
            ))}
        </div>
      </div>
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

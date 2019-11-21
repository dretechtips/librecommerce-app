import React, { useEffect } from "react";
import { InputProps } from "../interface/Input.interface";
import { currentId } from "async_hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

/**
 *
 * @param props Input Props
 * @typedef T Invalid State
 */
function Input<T extends {}>(props: InputProps<T>) {
  return (
    <div>
      <input type="text" className="form-control" onChange={props.verify} />
      <div className="text-sm">
        {props.valid.length === 0 ? (
          <span className="text-success">
            Client has successfully verify this {props.name.toLowerCase()}!
          </span>
        ) : (
          <React.Fragment>
            {props.invalid.map(cur => {
              if (props.valid.indexOf(cur.error) !== -1)
                return (
                  <span className="text-danger">
                    <FontAwesomeIcon icon={faCheck} fixedWidth />
                    {cur.message.fail}
                  </span>
                );
              else
                return (
                  <span className="text-success">
                    <FontAwesomeIcon icon={faTimes} fixedWidth />
                    {cur.message.success}
                  </span>
                );
            })}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Input;

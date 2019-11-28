import { ButtonProps } from "../interface/Button.interface";
import React from "react";

export function Button(props: ButtonProps): JSX.Element {
  if (props.disabled)
    return (
      <button
        className={
          "btn btn-" +
          props.color +
          (props.size ? " btn-" + props.size : "") +
          (props.active ? " active" : "") +
          " " +
          (props.className ? props.className : "")
        }
        disabled
        onClick={(e: React.MouseEvent) => {
          if (props.actionArgs) props.action(...props.actionArgs);
          else props.action();
        }}
      >
        {props.icon ? (
          <i className={props.icon + (props.value !== "" ? " mr-2" : "")}></i>
        ) : (
          ""
        )}
        {props.value}
      </button>
    );
  else
    return (
      <button
        className={
          "btn btn-" +
          props.color +
          (props.size ? " btn-" + props.size : "") +
          (props.active ? " active" : "") +
          " " +
          (props.className ? props.className : "")
        }
        onClick={(e: React.MouseEvent) => {
          if (props.actionArgs) props.action(...props.actionArgs);
          else props.action();
        }}
      >
        {props.icon ? (
          <i className={props.icon + (props.value !== "" ? " mr-2" : "")}></i>
        ) : (
          ""
        )}
        {props.value}
      </button>
    );
}

export default Button;

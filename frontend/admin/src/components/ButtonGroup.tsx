import React from "react";
import { ButtonGroupProps } from "../interface/ButtonGroup.interface";

export function ButtonGroup(props: ButtonGroupProps) {
  return (
    <div
      className={
        (props.vertical ? "btn-group-vertical " : "btn-group ") +
        (props.size ? props.size : "") +
        " " +
        (props.className ? props.className : "")
      }
    >
      {props.children}
    </div>
  );
}

export default ButtonGroup;

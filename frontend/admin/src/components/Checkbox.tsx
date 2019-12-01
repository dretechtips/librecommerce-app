import React from "react";
import { CheckboxUIProps } from "../interface/Checkbox.interface";

function Checkbox(props: CheckboxUIProps) {
  return (
    <div className="custom-control custom-checkbox">
      <input type="checkbox" className="custom-control-input" {...props} />
      {props.label && (
        <label className="custom-control-label">{props.label}</label>
      )}
    </div>
  );
}

export default Checkbox;

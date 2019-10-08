import { FormProps } from "../interface/Form.interface";
import React from "react";

export function Form(props: FormProps) {
  return (<div>
  { props.questions.map((cur, index) => {
    cur.input.className = cur.input.className.search("form-control") ? "" : " form-control";
    if(props.modifier === "read")
      cur.input.setAttribute('readonly', 'readonly');
    return(
      <div className="form-group">
        <label htmlFor=""></label>
        {cur.input}
      </div>
    )
  }) }
  </div>)
}
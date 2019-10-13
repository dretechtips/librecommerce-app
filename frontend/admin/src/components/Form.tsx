import { FormProps } from "../interface/Form.interface";
import React from "react";
import Button from "../components/Button";
import TextAreaList from "../components/TextBoxList";

export default (props: FormProps) => {
  return (<div>
  { props.questions.map((cur, index) => {
    let el: JSX.Element;
    switch(cur.input) {
      case "text":
        el = <input type="text" className="form-control" readOnly={props.modifier === "read" ? true : false} placeholder={cur.placeholder ? cur.placeholder : ""}/>;
        break;
      case "textarea":
        el = <textarea className="form-control" readOnly={props.modifier === "read" ? true : false} placeholder={cur.placeholder ? cur.placeholder : ""}/>;
        break;
      case "date":
        el = <input type="date" className="form-control" readOnly={props.modifier === "read" ? true : false}/>;
        break;
      case "select":
        if(cur.options) 
          el = <select className="form-control" disabled={props.modifier === "read" ? true : false}>{cur.options.map(cur => (<option value={cur}>{cur}</option>))}</select>;
        else
          el = <select className="form-control" disabled={props.modifier === "read" ? true : false}></select>;
        break;
      case "textarea-list":
        el = <TextAreaList className="form-control" readOnly={props.modifier === "read" ? true : false}/>;
        break;
      case "date-range":
        el = (
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input 
                type="date" 
                className="form-control" 
                placeholder="Start Date"
                  />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input 
                type="date" 
                className="form-control" 
                placeholder="End Date" />
              </div>
            </div>
          </div>
        );
        break;
      default:
        el = <input type="text" className="form-control" readOnly={props.modifier === "read" ? true : false}/>;
        break;
    }
    return(
      <div className="form-group">
        <label htmlFor="">{cur.question}</label>
        {el}
      </div>
    )
  }) }
  {props.submit 
  ? (
  <div className="form-group">
    <Button value="Submit" color="primary" action={props.submit}/>
  </div>) 
  : ""}
  </div>)
}
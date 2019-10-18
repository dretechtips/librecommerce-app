import { FormUIProps } from "../interface/Form.interface";
import React, { useRef, MutableRefObject } from "react";
import Button from "../components/Button";
import TextAreaList from "../components/TextBoxList";
import Alert from "./Alert";
import BarcodeScannerBox from "../containers/BarcodeScannerBox";

export default (props: FormUIProps) => {
  const ref = useRef<HTMLDivElement>(null);
  function inputCallback
  (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, 
    index: number) : void  {
    props.values[index] = e.currentTarget.value;
  }
  function scrollToTop(ref: MutableRefObject<HTMLDivElement>): void {
    const wrapper: Element | null = ref.current.offsetParent;
    if(wrapper) 
      wrapper.scrollIntoView({ behavior: "smooth", block: "start" });
    else
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function submit(ref: MutableRefObject<HTMLDivElement>) {
    scrollToTop(ref);
    if(props.submit) 
      props.submit(props.values);
  }
  return (<div ref={ref}>
  {props.success 
  ? (<Alert message="The form has recorded the response SUCCESSFULLY!" dismissable theme="success"/>)
  : ""}
  {props.error
  ? (<Alert message={props.error} dismissable theme="danger"/>)
  : ""}
  { props.questions.map((cur, index) => {
    let el: JSX.Element;
    switch(cur.input) {
      case "text":
        el = <input type="text" className="form-control" readOnly={props.modifier === "read" ? true : false} placeholder={cur.placeholder ? cur.placeholder : ""} onInput={(e) => inputCallback(e, index)}/>;
        break;
      case "textarea":
        el = <textarea className="form-control" readOnly={props.modifier === "read" ? true : false} placeholder={cur.placeholder ? cur.placeholder : ""} onInput={(e) => inputCallback(e, index)}/>;
        break;
      case "date":
        el = <input type="date" className="form-control" readOnly={props.modifier === "read" ? true : false}
        onInput={(e) => inputCallback(e, index)}/>;
        break;
      case "select":
        if(cur.options) 
          el = <select 
          className="form-control" 
          disabled={props.modifier === "read" ? true : false} 
          onInput={(e) => inputCallback(e, index)}>{cur.options.map(cur => (<option value={cur}>{cur}</option>))}</select>;
        else
          el = <select 
          className="form-control" 
          disabled={props.modifier === "read" ? true : false}
          onInput={(e) => inputCallback(e, index)}></select>;
        break;
      case "textarea-list":
        el = <TextAreaList 
        className="form-control" 
        readOnly={props.modifier === "read" ? true : false} 
        onInput={(e) => inputCallback(e, index)}/>;
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
      case "barcode":
        el = <BarcodeScannerBox />
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
    <Button value="Submit" color="primary" action={() => submit(ref as React.MutableRefObject<HTMLDivElement>)}/>
  </div>) 
  : ""}
  </div>)
}
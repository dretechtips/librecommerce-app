import React from "react";
import { AlertProps } from "../interface/Alert.interface";

export default (props: AlertProps) => {
  return (
    <div className={"alert  text-left " + "alert-" + props.theme + " " + (props.dismissable ? "alert-dismissible fade show": "")}>
      {props.message}
      {props.dismissable
        ? (<button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
           </button>)
        : ""}
    </div>
  )
}
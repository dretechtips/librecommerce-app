import { ButtonProps } from "../interface/Button.interface";
import React from "react";

export function Button(props: ButtonProps): JSX.Element {
  if(props.disabled)
    return <button className={"btn btn-" + props.color + (props.size ? "btn-" + props.size : "") + (props.active ? " active" : "")} disabled onClick={(e: React.MouseEvent) => props.action(...props.actionArgs)}>{props.value}</button>
  else
    return <button className={"btn btn-" + props.color + (props.size ? "btn-" + props.size : "") + (props.active ? " active" : "") } onClick={(e: React.MouseEvent) =>
    props.action(...props.actionArgs)}>{props.value}</button>
}
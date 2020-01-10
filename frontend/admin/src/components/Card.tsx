import React from "react";
import { CardProps } from "../interface/Card.interface";

export function Card(props: CardProps) {
  return (
    <div
      className={
        "mb-4 card " +
        (props.className !== undefined ? props.className : "") +
        " " +
        (props.border ? "border-" + props.border : "")
      }
    >
      {props.title ? (
        <h5 className={"card-header  bg-" + props.theme + " font-weight-bold"}>
          {props.title.toUpperCase()}
        </h5>
      ) : (
        ""
      )}
      <div className="card-body">{props.children}</div>
    </div>
  );
}

export default Card;

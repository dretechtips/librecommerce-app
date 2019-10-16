import React from 'react';
import { CardProps } from "../interface/Card.interface";

export function Card(props: CardProps) {
  return (
    <div className={"mb-4 card " + (props.className !== undefined ? props.className : "")}>
      {props.title 
      ? <h5 className={"m-0 bg-" + props.theme + " py-3 px-3 font-weight-bold"}>{props.title.toUpperCase()}</h5>
      : ""}
      <div className="card-body">
        {props.children}
      </div>
    </div>
  )
}

export default Card

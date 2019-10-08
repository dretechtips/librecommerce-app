import React from 'react';
import { CardProps } from "../interface/Card.interface";

export function Card(props: CardProps) {
  return (
    <div className={"card " + (props.className !== undefined ? props.className : "")}>
      <h3 className={"bg-" + props.theme + " py-2 px-3 "}>{props.title}</h3>
      <div className="card-body">
        {props.children}
      </div>
    </div>
  )
}

export default Card

import React, { Component } from 'react'
import { CardProps, CardState } from '../../interface/Card.interface'

export class Card extends Component<CardProps, CardState> {
  constructor(props: CardProps)
  {
    super(props);
  }
  render() {
    return (
      <div className={"card " + (this.props.className !== undefined ? this.props.className : "")}>
        <h3 className={"bg-" + this.props.theme + " py-2 px-3 "}>{this.props.title}</h3>
        <div className="card-body">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Card

import React, { Component } from 'react'
import { ActionProps, ActionState } from '../../interface/Action.interface';
import { Http } from "../../service/http.service";

export class Actions extends Component<ActionProps, ActionState> {
  constructor(props: ActionProps)
  {
    super(props);
  }
  render() {
    return (
      <div className="row">
        {this.props.items.map(cur => (
          <div className="col-md-3">
            <div className="card">
              <div className="card-body text-center" onClick={() => cur.component.setState({...cur.component.state, route: cur.route})}>
                <i className={cur.icon + " fa-6x fa-fw"}></i>
                <h4>{cur.name}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default Actions

import React, { Component } from 'react'
import { ReturnbarProps } from '../../interface/Returnbar.interface'

export class Returnbar extends Component<ReturnbarProps> {
  constructor(props: ReturnbarProps)
  {
    super(props);
  }
  render() {
    return (

        <div className="row mb-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <a href="javascript:void" onClick={() => this.props.previousState.component.setState({...this.props.previousState.component.state, route: this.props.previousState.stateName})}><i className="fas fa-chevron-left"></i> Return</a>
              </div>
            </div>
          </div>
        </div>

    )
  }
}

export default Returnbar

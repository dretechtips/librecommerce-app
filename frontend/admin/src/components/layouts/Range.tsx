import React, { Component } from 'react'
import { RangeProps, RangeState } from '../../interface/Range.interface'

export class Range extends Component<RangeProps, RangeState> {
  constructor(props: RangeProps)
  {
    super(props);
  }
  render() {
    return (
      <div className="row">
        <div className="form-group col-6">
          <input type="number" className="form-control w-100" placeholder={this.props.prepend + " MIN"}/>
        </div>
        <div className="form-group col-6">
          <input type="number" className="form-control w-100" placeholder={this.props.prepend + " MAX"}/>
        </div>
      </div>
    )
  }
}

export default Range

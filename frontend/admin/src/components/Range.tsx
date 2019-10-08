import React from "react";
import { RangeProps, RangeState } from '../interface/Range.interface'

export function Range(props: RangeProps) {
  return (
    <div className="row">
      <div className="form-group col-6">
        <input type="number" className="form-control w-100" placeholder={props.unit + " MIN"}/>
      </div>
      <div className="form-group col-6">
        <input type="number" className="form-control w-100" placeholder={props.unit + " MAX"}/>
      </div>
    </div>
  )
}
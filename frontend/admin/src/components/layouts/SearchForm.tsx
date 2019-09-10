import React, { Component } from 'react'
import { SearchFormProps, SearchFormState, SearchInput } from '../../interface/SearchForm.interface';
import { Range } from "./Range";  

export class SearchForm extends Component<SearchFormProps, SearchFormState> {
  constructor(props: SearchFormProps)
  {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <div className="row">
          {this.props.input.filter(cur => cur.type === "text" || cur.type === "number" || cur.type === "range").map(cur => (
            <div className="col-md-6">
              <label htmlFor="">{cur.label}</label>
              {cur.type === "range" && 
              <Range min={0} max={100} prepend="$" />}
              {(cur.type === "text" || cur.type === "number") &&
              <input className="form-control" type={cur.type} name="" id=""/>}
            </div>
          ))}
        </div>
        <div className="row">
          {this.props.input.filter(cur => cur.type === "checkbox").map(cur => (
            <div className="col-md-6">
              <label htmlFor="">{cur.label}</label>
              <input type="checkbox" name="" id=""/>
            </div>
          ))}
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <button className="btn btn-primary">Submit</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default SearchForm

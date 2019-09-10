import React, { Component } from 'react'
import { FormProps, FormState } from '../../interface/Form.interface'

export class Form extends Component<FormProps, FormState> {
  constructor(props: FormProps)
  {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        {this.props.questions.map(cur => {
          if(cur.type === "input")
          {
            return (<div className="form-group">
              <label htmlFor="">{cur.label}</label>
              <input className="form-control" type={cur.type !== undefined ? cur.type : "text"}/>
            </div>)
          }
          else if(cur.type === "select")
          {
            return (<div className="form-group">
              <label htmlFor="">{cur.label}</label>
              <select className="form-control" name="" id="">
                {cur.options !== undefined ? cur.options.map(cur => (<option>{cur}</option>)): (<option>NO_VALUE</option>)}
              </select>
            </div>)
          }
          else if(cur.type === "textarea")
          {
            return (<div className="form-group">
              <label htmlFor="">{cur.label}</label>
              <textarea className="form-control" name="" id="" cols={30} rows={10}></textarea>
            </div>)
          }
          else if (cur.type === "checkbox")
          {
            return (<div className="custom-control custom-checkbox">
              <label htmlFor="" className="custom-control-label active">Active</label>
              <input type="checkbox" className="custom-control-input"/>
            </div>)
          }
        })}
        <div className="form-group mt-4">
          <button className="btn btn-primary">Submit</button>
        </div>
      </React.Fragment>
    )
  }
}

export default Form

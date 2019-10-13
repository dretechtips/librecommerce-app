import React from 'react'
import { DropdownProps } from "../interface/Dropdown.interface";
import { Link, Router } from 'react-router-dom';

function Dropdown(props: DropdownProps) {
  return (
    <div className="dropdown">
      <span className="dropdown-toggle" data-toggle="dropdown">
        {props.element 
          ? props.element
          : (<div>
            {props.icon ? (<i className={props.icon} ></i>) : ""}
            {props.name ? props.name : props.name}
          </div>)}
      </span>
      <div className="dropdown-menu dropdown-menu-right">
        {props.items.map(cur => {
          if(cur === "split")
            return (<div className="dropdown-divider"></div>)
          else 
            return (
            <Link to={cur.path} className="dropdown-item">
              {cur.icon ? (<i className={cur.icon + " mr-2"}></i>) : ""}
              {cur.name ? cur.name : ""}
            </Link>)
        })}
      </div>
    </div>
  )
}

export default Dropdown

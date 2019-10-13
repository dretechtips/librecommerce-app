import { NavProps } from "../interface/Nav.interface";
import React from "react";
import { Link } from "react-router-dom";

export function Nav(props: NavProps) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-success">
      <Link to={props.dashboardPath} className="navbar-brand">
        <img src={props.logoURL} width="40" alt="Logo"/>
      </Link>
      <button className="navbar-toggler" data-toggle="collapse" data-target="navbarPanel">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarPanel">
        <ul className="navbar-nav mr-auto">
          {props.leftItems ? (props.leftItems.map(cur => {
            return (
            <li className="nav-item">
              <a href="#" className="nav-link">
                {cur}
              </a>
            </li>
            )
          })) : ""}
        </ul>
        <ul className="navbar-nav ml-auto">
          {props.rightItems ? (props.rightItems.map(cur => {
            return (
            <li className="nav-item">
              <a href="javascript:void" className="nav-link">
                {cur}
              </a>
            </li>
            )
          })) : ""}
        </ul>
      </div>
    </nav>
  )
}
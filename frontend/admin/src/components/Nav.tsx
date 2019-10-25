import { NavProps } from "../interface/Nav.interface";
import React from "react";
import App from "../containers/App";

export function Nav(props: NavProps) {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light border-bottom border-success">
      <App.contextType.Consumer>
        {state => <div onClick={() => state.actions.toggleSidePanel()}>
          {console.log(state)}
          <i className="fas fa-bars text-success fa-fw fa-2x"></i>
          </div>}
      </App.contextType.Consumer>
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
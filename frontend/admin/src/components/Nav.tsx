import { NavProps } from "../interface/Nav.interface";
import React from "react";
import SidePanel from "../containers/SidePanel";
import App from "../containers/App";
import NavContainer from "../containers/Nav";

export function Nav(props: NavProps) {
  return (
    <nav
      style={{
        top: 0,
        zIndex: 8888,
        maxHeight: NavContainer.getHeight(props.browser)
      }}
      className="w-100 navbar navbar-expand navbar-light bg-light border-bottom border-success position-fixed"
    >
      <App.contextType.Consumer>
        {app => (
          <SidePanel.contextType.Consumer>
            {sidePanel => (
              <React.Fragment>
                <div onClick={sidePanel.toggle} data-toggle="modal">
                  <i className="fas fa-bars text-success fa-fw fa-2x"></i>
                </div>
                <button
                  className="navbar-toggler"
                  data-toggle="collapse"
                  data-target="navbarPanel"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <img
                  src={app.logoURL}
                  alt="Logo"
                  className="ml-3"
                  width="40px"
                />
              </React.Fragment>
            )}
          </SidePanel.contextType.Consumer>
        )}
      </App.contextType.Consumer>
      <div className="collapse navbar-collapse" id="navbarPanel">
        <ul className="navbar-nav mr-auto">
          {props.leftItems
            ? props.leftItems.map(cur => {
                return (
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      {cur}
                    </a>
                  </li>
                );
              })
            : ""}
        </ul>
        <ul className="navbar-nav ml-auto">
          {props.rightItems
            ? props.rightItems.map(cur => {
                return (
                  <li className="nav-item">
                    <a href="javascript:void" className="nav-link">
                      {cur}
                    </a>
                  </li>
                );
              })
            : ""}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

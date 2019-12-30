import React from "react";
import { SidePanelUIProps } from "../interface/SidePanel.interface";
import { useHistory } from "react-router-dom";
import Dashboard from "../containers/Dashboard";
import "./css/SidePanel.css";
import App from "../containers/App";
import SidePanelContainer from "../containers/SidePanel";

function SidePanel(props: SidePanelUIProps): JSX.Element {
  const history = useHistory();
  function toDashboard(index: number, name: string, search: Function) {
    history.push(props.dashboardPath);
    props.toDashboard(index, name, search);
  }
  return (
    <div
      className={props.open ? "d-print-none" : "d-none d-print-none"}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: SidePanelContainer.getWidth("desktop") + "px",
        height: "100%",
        zIndex: 9999,
        backgroundColor: "white"
      }}
      onMouseMove={props.slide.capture}
      onMouseDown={props.slide.init}
      onMouseUp={props.slide.end}
    >
      <div className="col p-0 h-100">
        <nav>
          <ul className="nav nav-pills flex-column">
            <App.contextType.Consumer>
              {state => {
                return (
                  <li className="nav-item">
                    <span className="nav-link">
                      <a
                        href="javascript:void"
                        onClick={e => {
                          e.preventDefault();
                          props.toggle();
                        }}
                      >
                        <i className="fa fa-bars fa-2x text-success mx-2"></i>
                      </a>
                      <img
                        src={state.logoURL}
                        alt="Logo"
                        width={40}
                        className="img-fluid ml-1"
                      />
                    </span>
                  </li>
                );
              }}
            </App.contextType.Consumer>
          </ul>
        </nav>
        <nav className="sidepanel-list">
          <ul className="nav nav-pills flex-column">
            {props.items.map((cur, index) => {
              return (
                <Dashboard.contextType.Consumer>
                  {search => (
                    <li
                      className={"nav-item"}
                      key={index}
                      onClick={() =>
                        props.toDashboard(index, cur.name.toLowerCase(), search)
                      }
                      onMouseEnter={() =>
                        (document.body.style.cursor = "pointer")
                      }
                      onMouseLeave={() =>
                        (document.body.style.cursor = "default")
                      }
                    >
                      <span
                        className={
                          "nav-link d-flex justify-content-between text-muted align-items-center " +
                          (props.active === index ? "sidepanel-active" : "")
                        }
                      >
                        <div>
                          <i className={cur.icon + " fa-fw mr-2"}></i>
                          {cur.name}
                        </div>
                        <i className="fas fa-fw fa-chevron-right"></i>
                      </span>
                    </li>
                  )}
                </Dashboard.contextType.Consumer>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SidePanel;

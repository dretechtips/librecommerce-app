import React from 'react';
import {  SidePanelProps, SidePanelUIProps  } from "../interface/SidePanel.interface";
import { useHistory } from "react-router-dom";
import Dashboard from '../containers/Dashboard';
import "./css/SidePanel.css";

function SidePanel(props: SidePanelUIProps) {
  const history = useHistory();
  function toDashboard(index: number, name: string, search: Function) {
    history.push(props.dashboardPath);
    props.toDashboard(index, name, search);
  }
  return (
    <div className="col-md-2 border-right border-secondary h-100">
      <nav className="h-100">
        <ul className="nav nav-pills flex-column">
          {props.items.map((cur, index) => {
            return (
              <Dashboard.contextType.Consumer>
                {(search) => (
                  <li className={"nav-item"} key={index}
                    onClick={() => toDashboard(index, cur.name.toLowerCase(), search)}
                    onMouseEnter={() => document.body.style.cursor = "pointer"}
                    onMouseLeave={() => document.body.style.cursor = "default"}>
                    <span className={"nav-link d-flex justify-content-between text-muted align-items-center " + (props.active === index ? "sidepanel-active" : "")}>
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
  )
}

export default SidePanel

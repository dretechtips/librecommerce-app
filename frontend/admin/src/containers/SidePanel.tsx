import React, { Component } from 'react';
import {  SidePanelProps, SidePanelState  } from "../interface/SidePanel.interface";
import "./css/SidePanel.css";

export class SidePanel extends Component<SidePanelProps, SidePanelState> {
  constructor(props: SidePanelProps)
  {
    super(props);
    this.state = {
      active: 0
    }
  }
  render() {
    return (
      <div className="col-md-2 border-right border-secondary h-100">
        <nav className="h-100">
          <ul className="nav nav-pills flex-column">
            {this.props.items.map((cur, index) => {
              return (
                <li className={"nav-item"} key={index} onClick={() => this.setState({...this.state, active: index})} 
                onMouseEnter={() => document.body.style.cursor = "pointer"} onMouseLeave={() => document.body.style.cursor = "default"}>
                  <span className={"nav-link d-flex justify-content-between text-muted align-items-center " + (this.state.active === index ? "sidepanel-active" :  "")}>
                    <div>
                      <i className={cur.icon + " fa-fw mr-2"}></i>
                      {cur.name}
                    </div>
                    <i className="fas fa-fw fa-chevron-right"></i>
                  </span>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    )
  }
}

export default SidePanel

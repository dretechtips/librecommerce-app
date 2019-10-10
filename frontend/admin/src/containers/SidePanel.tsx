import React, { Component } from 'react';
import {  SidePanelProps, SidePanelState  } from "../interface/SidePanel.interface";
import "./css/SidePanel.css";
import Dashboard from '../containers/Dashboard';

export class SidePanel extends Component<SidePanelProps, SidePanelState> {
  constructor(props: SidePanelProps)
  {
    super(props);
    this.state = {
      active: 0
    }
  }
  updateDashboard(index: number, name: string, search: Function) {
    this.setState({ ...this.state, active: index });
    search(name);
  }
  componentDidMount() {
    this.setState({ ...this.state });
  }
  render() {
    return (
      <div className="col-md-2 border-right border-secondary h-100">
        <nav className="h-100">
          <ul className="nav nav-pills flex-column">
            {this.props.items.map((cur, index) => {
              return (
                <Dashboard.contextType.Consumer>
                  {(search) => (
                    <li className={"nav-item"} key={index}
                      onClick={() => this.updateDashboard(index, cur.name.toLowerCase(), search)}
                      onMouseEnter={() => document.body.style.cursor = "pointer"}
                      onMouseLeave={() => document.body.style.cursor = "default"}>
                      <span className={"nav-link d-flex justify-content-between text-muted align-items-center " + (this.state.active === index ? "sidepanel-active" : "")}>
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
}

export default SidePanel

import React, { Component } from 'react'
import { SidebarProps, SidebarState } from '../../interface/Sidebar.interface'

export class Sidebar extends Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps)
  {
    super(props);
  }
  render() {
    return (
      <nav>
        <ul className="nav flex-column">
          {this.props.items.map(cur => {
            return (
              <li className="nav-item" onClick={() => this.props.reroute(cur.name.toLowerCase())}>
                <span className="nav-link d-flex justify-content-between text-muted align-items-center">
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
    )
  }
}

export default Sidebar

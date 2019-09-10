import React, { Component } from 'react'
import { TabsProps, TabsState, TabsPill } from '../../interface/Tabs.interface'

export class Tabs extends Component<TabsProps, TabsState> {
  constructor(props: TabsProps)
  {
    super(props);
    this.state = {
      active: 0
    }
  }
  public changeTab(cur: TabsPill, index: number): void
  {
    cur.change(cur.changeArg);
    this.setState({...this.state, active: index});
  }
  render() {
    return (
      <ul className="nav nav-pills mb-4">
        {this.props.pills.map((cur, index) => {
          return (<li className="nav-item">
            <a href="javascript:void" className={"nav-link " + (this.state.active === index ? "active" : "")} key={index} onClick={() => this.changeTab(cur, index)}>
              {cur.name}
            </a>
          </li>)
        })}
      </ul>
    )
  }
}

export default Tabs

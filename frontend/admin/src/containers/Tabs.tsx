import React, { Component } from 'react'
import { TabsProps, TabsState, TabsPill } from '../interface/Tabs.interface'

export class Tabs extends Component<TabsProps, TabsState> {
  constructor(props: TabsProps)
  {
    super(props);
    this.state = {
      active: 0,
      content: this.props.pills[0].children,
    }
  }
  public changePanel(cur: TabsPill, index: number): void
  {
    this.setState({...this.state, active: index, content: this.props.pills[index].children});
  }
  render() {
    return (
      <div>
        <ul className="nav nav-pills mb-4">
          {this.props.pills.map((cur, index) => {
            return (<li className="nav-item">
              <a href="javascript:void" className={"nav-link " + (this.state.active === index ? "active" : "")} key={index} onClick={() => this.changePanel(cur, index)}>
                {cur.name}
              </a>
            </li>)
          })}
        </ul>
        {this.state.content}
      </div>
    )
  }
}

export default Tabs

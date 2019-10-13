import React, { Component } from 'react';
import {  SidePanelProps, SidePanelState  } from "../interface/SidePanel.interface";
import SidePanelUI from "../components/SidePanel";

export class SidePanel extends Component<SidePanelProps, SidePanelState> {
  constructor(props: SidePanelProps)
  {
    super(props);
    this.state = {
      active: 0
    }
  }
  toDashboard = (index: number, name: string, search: Function) => {
    this.setState({ ...this.state, active: index });
    search(name);
  }
  componentDidMount() {
    this.setState({ ...this.state });
  }
  render() {
    return (
      <SidePanelUI toDashboard={this.toDashboard} active={this.state.active} items={this.props.items} dashboardPath={this.props.dashboardPath}/>
    )
  }
}

export default SidePanel

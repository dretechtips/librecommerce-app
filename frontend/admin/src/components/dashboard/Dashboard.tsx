import React, { Component } from 'react'
import { DashboardProps, DashboardState } from '../../interface/Dashboard.interface';
import { Actions } from "../layouts/Actions";

export class Dashboard extends Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps)
  {
    super(props);
  }
  render() {
    return (<div></div>);
  }
}

export default Dashboard

import React, { Component } from 'react';
import {  SidePanelProps, SidePanelState  } from "../interface/SidePanel.interface";
import SidePanelUI from "../components/SidePanel";
import App from '../containers/App';

export class SidePanel extends Component<SidePanelProps, SidePanelState> {
  constructor(props: SidePanelProps)
  {
    super(props);
    this.state = {
      active: 0,
      mode: window.innerWidth >= 768 ? "desktop" : "mobile",
      isSliding: false,
      position: 0
    }
  }
  toDashboard = (index: number, name: string, search: Function) => {
    this.setState({ ...this.state, active: index });
    search(name);
  }
  resize = (e: UIEvent) => {
    if(window.innerWidth >= 768)
      this.setState({...this.state, mode: "desktop"});
    else
      this.setState({...this.state, mode: "mobile"});
  }
  componentDidMount() {
    this.setState({ ...this.state });
    window.addEventListener("resize", this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }
  slideCapture = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(this.state.isSliding) {
      if(e.movementX < 0)
        this.setState({...this.state, position: this.state.position + e.movementX});
      else if (e.movementX > 0 && this.state.position < 0)
        this.setState({...this.state, position: this.state.position + e.movementX});
      else if (this.state.position > 0)
        this.setState({...this.state, position: 0});
    }
  }
  slideInit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.setState({...this.state, isSliding: true});
  }
  slideEnd = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.setState({...this.state, isSliding: false, position: 0});
  }
  touchInit = (e: React.TouchEvent<HTMLDivElement>) => {
    this.setState({...this.state, isSliding: true});
  }
  touchCapture = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch: React.Touch = e.touches.item(0);
  }
  touchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    this.setState({...this.state, isSliding: false, position: 0});
  }
  render() {
    return (
      <SidePanelUI 
      slide={{
        position: this.state.position,
        init: this.slideInit,
        capture: this.slideCapture,
        end: this.slideEnd
      }}
      toDashboard={this.toDashboard} 
      active={this.state.active} 
      items={this.props.items} 
      dashboardPath={this.props.dashboardPath}
      mode={this.state.mode}/>
    )
  }
}

export default SidePanel

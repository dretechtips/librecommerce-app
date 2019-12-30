import React, { Component } from "react";
import {
  SidePanelProps,
  SidePanelState,
  SidePanelContext
} from "../interface/SidePanel.interface";
import SidePanelUI from "../components/SidePanel";
import getScreenType from "../utils/ScreenToSize";

export class SidePanel extends Component<SidePanelProps, SidePanelState> {
  public static getWidth = (browser: "mobile" | "desktop"): number => {
    return 225;
  };
  public static contextType = React.createContext<SidePanelContext>({
    isOpen: () => SidePanel.isOpen(),
    toggle: () => SidePanel.toggle()
  });
  private static isOpen = () => false;
  private static toggle = () => {};
  constructor(props: SidePanelProps) {
    super(props);
    this.state = {
      active: 0,
      isSliding: false,
      position: 0,
      open: SidePanel.isOpen()
    };
    SidePanel.isOpen = this.isOpen;
    SidePanel.toggle = this.toggle;
  }
  public isOpen = () => {
    return this.state.open;
  };
  public toggle = () => {
    this.setState({ ...this.state, open: !this.state.open });
  };
  public toDashboard = (index: number, name: string, search: Function) => {
    this.setState({ ...this.state, active: index });
    search(name);
  };
  slideCapture = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (this.state.isSliding) {
      if (e.movementX < 0)
        this.setState({
          ...this.state,
          position: this.state.position + e.movementX
        });
      else if (e.movementX > 0 && this.state.position < 0)
        this.setState({
          ...this.state,
          position: this.state.position + e.movementX
        });
      else if (this.state.position > 0)
        this.setState({ ...this.state, position: 0 });
    }
  };
  slideInit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.setState({ ...this.state, isSliding: true });
  };
  slideEnd = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.setState({ ...this.state, isSliding: false, position: 0 });
  };
  touchInit = (e: React.TouchEvent<HTMLDivElement>) => {
    this.setState({ ...this.state, isSliding: true });
  };
  touchCapture = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch: React.Touch = e.touches.item(0);
  };
  touchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    this.setState({ ...this.state, isSliding: false, position: 0 });
  };
  render() {
    return (
      <SidePanelUI
        {...this.props}
        slide={{
          position: this.state.position,
          init: this.slideInit,
          capture: this.slideCapture,
          end: this.slideEnd
        }}
        toDashboard={this.toDashboard}
        active={this.state.active}
        open={this.state.open}
        toggle={this.toggle}
      />
    );
  }
}

export default SidePanel;

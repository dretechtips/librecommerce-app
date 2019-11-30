import React, { Component } from "react";
import {
  ActivatorProps,
  ActivatorState
} from "../interface/Activator.interface";
import ActivatorUI from "../components/Activator";
import { Redirect } from "react-router";
import { ListItem, ListItemAction } from "../interface/List.interface";

export class Activator extends Component<ActivatorProps, ActivatorState> {
  constructor(props: ActivatorProps) {
    super(props);
    this.state = {
      toAdd: false,
      activated: [],
      deactivated: []
    };
  }
  public async componentDidMount(): Promise<void> {
    const activated: ListItem[] = await this.props.getActivated();
    const deactivated: ListItem[] = await this.props.getDeactivated();
    this.setState({ ...this.state, activated, deactivated });
  }
  public activate = async (id: string) => {
    try {
      await this.props.activate(id);
      this.setState({ ...this.state });
    } catch (e) {
      return;
    }
  };
  public deactivate = async (id: string) => {
    try {
      await this.props.deactivate(id);
      this.setState({ ...this.state });
    } catch (e) {
      return;
    }
  };
  private aDeactivated: ListItemAction[] = [
    { func: this.deactivate, name: "Deactivate", icon: "fas fa-toggle-off" }
  ];
  public aActivated: ListItemAction[] = [
    { func: this.activate, name: "Activate", icon: "fas fa-toggle-on" }
  ];

  render() {
    if (this.state.toAdd) {
      return <div></div>;
    } else {
      return (
        <ActivatorUI
          {...this.props}
          activated={{
            elements: this.state.activated,
            actions: this.aActivated
          }}
          deactivated={{
            elements: this.state.deactivated,
            actions: this.aDeactivated
          }}
          activate={this.activate}
          deactivate={this.deactivate}
        />
      );
    }
  }
}

export default Activator;

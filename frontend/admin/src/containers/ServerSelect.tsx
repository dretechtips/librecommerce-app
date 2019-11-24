import React, { Component } from "react";
import {
  ServerSelectProps,
  ServerSelectState,
  ServerData
} from "../interface/ServerSelect.interface";
import ServerSelectUIProps from "../components/ServerSelect";
import { ListItem, ListItemAction } from "../interface/List.interface";

export class ServerSelect extends Component<
  ServerSelectProps,
  ServerSelectState
> {
  constructor(props: ServerSelectProps) {
    super(props);
    this.state = {
      servers: [],
      selectedID: null
    };
  }
  public lookup(): void {
    // Calls an HTTP Procedure
    this.setState({ ...this.state, servers: [ServerTestUnit] });
  }
  public componentDidMount() {
    this.lookup();
  }
  public select = (id: string): void => {
    this.setState({ ...this.state, selectedID: id });
  };
  public convert = (servers: ServerData): ListItem => {
    return {
      value: servers.name,
      id: servers.id
    };
  };
  render() {
    if (this.state.selectedID === null)
      return (
        <ServerSelectUIProps
          {...this.props}
          select={this.select}
          servers={this.state.servers}
          convert={this.convert}
        />
      );
    else return this.props.children(this.state.servers, this.state.selectedID);
  }
}

const ServerTestUnit: ServerData = {
  name: "USA-1",
  id: "bndob2ob5o42",
  city: "Dallas",
  state: "Texas",
  country: "USA",
  ipAddress: "192.168.1.2",
  type: "compute"
};

export default ServerSelect;

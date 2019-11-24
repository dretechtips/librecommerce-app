import React from "react";
import List from "../containers/List";
import Searchbar from "./Searchbar";
import {
  ServerSelectUIProps,
  ServerData
} from "../interface/ServerSelect.interface";
import {
  ListItems,
  ListItem,
  ListItemAction
} from "../interface/List.interface";
import PreloadedSearch from "../containers/PreloadedSearch";

function ServerSelect(props: ServerSelectUIProps) {
  const actions: ListItemAction[] = [
    {
      name: "Select",
      icon: "fas fa-check-circle",
      func: props.select
    }
  ];

  return (
    <PreloadedSearch<ServerData>
      actions={actions}
      placeholder={"Find a server..."}
      items={props.servers}
      convert={props.convert}
    />
  );
}

export default ServerSelect;

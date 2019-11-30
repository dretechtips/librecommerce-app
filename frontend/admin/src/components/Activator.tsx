import React from "react";
import { ActivatorUIProps } from "../interface/Activator.interface";
import Card from "./Card";
import List from "../containers/List";

function Activator(props: ActivatorUIProps) {
  return (
    <React.Fragment>
      <Card theme="success" title={"Activated " + props.name}>
        <List items={props.activated} />
      </Card>
      <Card theme="success" title={"Deactivated " + props.name}>
        <List items={props.deactivated} />
      </Card>
    </React.Fragment>
  );
}

export default Activator;

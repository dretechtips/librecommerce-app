import React from "react";
import { QueueUIProps } from "../interface/Queue.interface";
import Card from "./Card";
import List from "../containers/List";

function Queue(props: QueueUIProps) {
  return (
    <div>
      <Card theme="success" title={"New " + props.name}>
        <List
          items={{
            elements: props.avaliable.process,
            actions: props.avaliable.actions
          }}
        />
        <span className="small text-secondary mt-2">
          {"Orders last update as of "}
          <span className="font-weight-bold">{new Date().toString()}</span>
        </span>
      </Card>
      <Card theme="success" title={"Halted " + props.name}>
        <List
          items={{
            elements: props.halted.process,
            actions: props.halted.actions
          }}
        />
        <span className="small text-secondary mt-2">
          {"Orders last update as of "}
          <span className="font-weight-bold">{new Date().toString()}</span>
        </span>
      </Card>
    </div>
  );
}

export default Queue;

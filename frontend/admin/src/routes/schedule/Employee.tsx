import React from "react";
import Calander from "../../containers/Calander";
import { CalanderEvent } from "../../interface/Calander.interface";

function Employee() {
  async function getEvents(): Promise<CalanderEvent[]> {
    return [
      {
        name: "This is an event",
        start: new Date(),
        end: new Date(),
        description: "This is a description"
      }
    ];
  }
  return <Calander mode="week" start={new Date()} getEvents={getEvents} />;
}

export default Employee;

import React from "react";
import { QueueProcess } from "../../interface/Queue.interface";
import Queue from "../../containers/Queue";

async function getAvaliable(): Promise<QueueProcess[]> {
  return [];
}

async function getHalted(): Promise<QueueProcess[]> {
  return [];
}

async function complete(id: string) {}

async function halt(id: string) {}

function Unprocessed() {
  return (
    <Queue
      name="Shipping"
      details="/shipping/archive/details"
      getAvaliable={getAvaliable}
      getHalted={getHalted}
      complete={complete}
      halt={halt}
    />
  );
}

export default Unprocessed;

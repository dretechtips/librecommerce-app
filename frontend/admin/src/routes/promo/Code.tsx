import React from "react";
import Activator from "../../containers/Activator";
import { ListItem } from "../../interface/List.interface";

async function activate(id: string) {}

async function deactivate(id: string) {}

async function getActivated(): Promise<ListItem[]> {
  return [];
}

async function getDeactivated(): Promise<ListItem[]> {
  return [];
}

function Code() {
  return (
    <Activator
      name="Promotion Code"
      activate={activate}
      deactivate={deactivate}
      getActivated={getActivated}
      getDeactivated={getDeactivated}
    />
  );
}

export default Code;

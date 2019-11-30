import React from "react";
import { ListItem } from "../../interface/List.interface";
import Activator from "../../containers/Activator";

async function activate(id: string) {}

async function deactivate(id: string) {}

async function getActivated(): Promise<ListItem[]> {
  return [];
}

async function getDeactivated(): Promise<ListItem[]> {
  return [];
}

function Coupon() {
  return (
    <Activator
      name="Coupon Promotion"
      activate={activate}
      deactivate={deactivate}
      getActivated={getActivated}
      getDeactivated={getDeactivated}
    />
  );
}

export default Coupon;

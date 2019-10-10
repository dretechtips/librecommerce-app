import React from "react";
import SidePanel from "../containers/SidePanel";
import { SidePanelItem } from "../interface/SidePanel.interface";

const items: SidePanelItem[] = [
  { name: "Ban", icon: "fas fa-hammer" },
  { name: "Billing", icon: "fas fa-money-check" },
  { name: "Cart", icon: "fas fa-shopping-cart" },
  { name: "Customer", icon: "fas fa-shopping-bag" },
  { name: "Inventory", icon: "fas fa-warehouse" },
  { name: "Order", icon: "fas fa-receipt" },
  { name: "Payroll", icon: "fas fa-redo" },
  { name: "Promotion", icon: "fas fa-ad" },
  { name: "Shipping", icon: "fas fa-truck" },
  { name: "Speech Filter", icon: "fas fa-filter" },
  { name: "Subscription", icon: "fas fa-hand-pointer" },
  { name: "Spy", icon: "fas fa-user-secret" },
  { name: "User", icon: "fas fa-user" }
]

export default () => {
  return (<SidePanel items={items}></SidePanel>)
}
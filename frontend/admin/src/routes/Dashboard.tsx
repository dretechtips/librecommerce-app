import React from "react";
import Dashboard from "../containers/Dashboard";
import { DashboardProps } from "../interface/Dashboard.interface";
import Ban from "./ban/Dashboard";
import Customer from "./customer/Dashboard";
import Inventory from "./inventory/Dashboard";
import Order from "./order/Dashboard";
import Billing from "./billing/Dashboard";
import Promo from "./promo/Dashboard";
import Payroll from "./payroll/Dashboard";
import Schedule from "./schedule/Dashboard";
import Shipping from "./shipping/Dashboard";
import Subscription from "./subscription/Dashboard";
// import Spy from "./spy/Dashboard";
import Cart from "./cart/Dashboard";
import User from "./user/Dashboard";
import Speech_Filter from "./speech_filter/Dashboard";

const actions: DashboardProps[] = [
  Ban,
  Billing,
  Cart,
  Customer,
  Inventory,
  Order,
  Promo,
  Payroll,
  Schedule,
  Shipping,
  Subscription,
  User,
  Speech_Filter
];

export default () => {
  return <Dashboard actions={actions} />;
};

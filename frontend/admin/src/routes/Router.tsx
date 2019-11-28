import { MainPanelRoute } from "../interface/MainPanel.interface";
import Dashboard from "./Dashboard";
import Logout from "../components/Logout";
import Report from "./report/Router";
import Order from "./order/Router";
import Inventory from "./inventory/Router";
import Customer from "./customer/Router";
import Schedule from "./schedule/Router";
import Shipping from "./shipping/Router";
import User from "./user/Router";

const Router: MainPanelRoute[] = [
  { path: "/", component: Dashboard },
  { path: "/signout", component: Logout },
  ...Report,
  ...Order,
  ...Inventory,
  ...Customer,
  ...Schedule,
  ...Shipping,
  ...User
];

export default Router;

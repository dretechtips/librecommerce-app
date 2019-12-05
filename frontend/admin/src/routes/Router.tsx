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
import Ban from "./ban/Router";
import Promotion from "./promo/Router";
import Subscription from "./subscription/Router";
import Payroll from "./payroll/Router";

const Router: MainPanelRoute[] = [
  { path: "/", component: Dashboard },
  { path: "/signout", component: Logout },
  ...Report,
  ...Order,
  ...Inventory,
  ...Customer,
  ...Schedule,
  ...Shipping,
  ...User,
  ...Ban,
  ...Promotion,
  ...Subscription,
  ...Payroll
];

export default Router;

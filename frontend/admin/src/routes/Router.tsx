import { MainPanelRoute } from "../interface/MainPanel.interface";
import Dashboard from "./Dashboard";
import Logout from "../components/Logout";
import Report from "./report/Router";
import Order from "./order/Router";
import Inventory from "./inventory/Router";

const Router: MainPanelRoute[] = [
  {  path: "/", component: Dashboard  },
  { path: "/signout", component: Logout },
  ...Report,
  ...Order,
  ...Inventory
]

export default Router;
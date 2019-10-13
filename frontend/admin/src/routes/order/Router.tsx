import { MainPanelRoute } from "../../interface/MainPanel.interface";
import Unprocessed from "./Unprocessed";
import Add from "./Add";
import Details from "./Details";
import Archive from "./Archive";

const Router: MainPanelRoute[] = [
  {path: "/order/unprocessed", component: Unprocessed},
  {path: "/order/add", component: Add},
  {path: "/order/details/:id", component: Details},
  {path: "/order/archive", component: Archive}
]

export default Router;
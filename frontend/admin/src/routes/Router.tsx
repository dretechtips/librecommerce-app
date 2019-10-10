import { MainPanelRoute } from "../interface/MainPanel.interface";
import Dashboard from "./Dashboard";

const Router: MainPanelRoute[] = [
  {  path: "/", component: Dashboard  }
]

export default Router;
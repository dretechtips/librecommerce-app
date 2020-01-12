import { MainPanelRoute } from "../../interface/MainPanel.interface";
import Unprocessed from "./Unprocessed";
import CRUD from "./CRUD";
import CRUDComponent from "../../containers/CRUDComponent";

const Router: MainPanelRoute[] = [
  { path: "/order/unprocessed", component: Unprocessed },
  { path: CRUDComponent.Path("/order"), component: CRUD }
];

export default Router;

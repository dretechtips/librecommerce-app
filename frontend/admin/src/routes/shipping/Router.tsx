import { MainPanelRoute } from "../../interface/MainPanel.interface";
import Unprocessed from "./Unprocessed";
import CRUDComponent from "../../containers/CRUDComponent";
import CRUD from "./CRUD";
export const Router: MainPanelRoute[] = [
  { path: CRUDComponent.Path("/shipping"), component: CRUD },
  { path: "/shipping/unprocessed", component: Unprocessed }
];

export default Router;

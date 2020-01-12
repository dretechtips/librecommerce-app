import { MainPanelRoute } from "../../interface/MainPanel.interface";
import CRUD from "./CRUD";
import CRUDComponent from "../../containers/CRUDComponent";

export const Router: MainPanelRoute[] = [
  { path: CRUDComponent.Path("/subscription"), component: CRUD }
];

export default Router;

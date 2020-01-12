import { MainPanelRoute } from "../../interface/MainPanel.interface";
import AppealCRUD from "./Appeal.CRUD";
import CRUD from "./CRUD";
import CRUDComponent from "../../containers/CRUDComponent";

export const Router: MainPanelRoute[] = [
  { path: CRUDComponent.Path("/ban/appeal"), component: AppealCRUD },
  { path: CRUDComponent.Path("/ban"), component: CRUD }
];

export default Router;

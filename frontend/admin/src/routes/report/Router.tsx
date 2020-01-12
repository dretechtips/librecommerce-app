import { MainPanelRoute } from "../../interface/MainPanel.interface";
import BugCRUD from "./Bug.CRUD";
import CRUDComponent from "../../containers/CRUDComponent";

const Router: MainPanelRoute[] = [
  { path: CRUDComponent.Path("/report/bug"), component: BugCRUD }
];

export default Router;

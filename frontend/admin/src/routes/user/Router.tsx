import { MainPanelRoute } from "../../interface/MainPanel.interface";
import Communicate from "./Communicate";
import CRUD from "./CRUD";
import CRUDComponent from "../../containers/CRUDComponent";

export const Router: MainPanelRoute[] = [
  { path: "/user/communicate", component: Communicate },
  { path: "/user", component: CRUD }
];

export default Router;

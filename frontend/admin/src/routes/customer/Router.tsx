import { MainPanelRoute } from "../../interface/MainPanel.interface";
import Communicate from "./Communicate";
import SendPassword from "./SendPassword";
import CRUDComponent from "../../containers/CRUDComponent";
import CRUD from "./CRUD";

export const Router: MainPanelRoute[] = [
  { path: CRUDComponent.Path("/customer"), component: CRUD }
  { path: "/customer/communicate", component: Communicate },
  { path: "/customer/communicate/password", component: SendPassword }
];

export default Router;

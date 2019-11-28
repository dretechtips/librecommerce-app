import { MainPanelRoute } from "../../interface/MainPanel.interface";
import Employee from "./Employee";

export const Router: MainPanelRoute[] = [
  { path: "/schedule/employee", component: Employee }
];

export default Router;

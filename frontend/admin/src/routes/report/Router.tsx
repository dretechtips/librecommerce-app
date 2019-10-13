import { MainPanelRoute } from "../../interface/MainPanel.interface";
import Bug from "./Bug";

const Router: MainPanelRoute[] = 
[{path: "/report/bug", component: Bug}];

export default Router;
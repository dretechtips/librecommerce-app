import { MainPanelRoute } from "../../interface/MainPanel.interface";
import ProductAdd from "./ProductAdd";

const Router: MainPanelRoute[] = [
  {path: "/inventory/product/add", component: ProductAdd}
];

export default Router;
import { MainPanelRoute } from "../../interface/MainPanel.interface";
import ProductAdd from "./ProductAdd";
import Product from "./Product";

const Router: MainPanelRoute[] = [
  { path: "/inventory/product", component: () => Product({ type: "base" }) },
  {
    path: "/inventory/product/add",
    component: () => ProductAdd({ type: "base" })
  },
  {
    path: "/inventory/product-variation/",
    component: () => Product({ type: "variation" })
  },
  {
    path: "/inventory/product-variation/add",
    component: () => ProductAdd({ type: "variation" })
  }
];

export default Router;

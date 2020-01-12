import { MainPanelRoute } from "../../interface/MainPanel.interface";
import CategoryCRUD from "./Category.CRUD";
import ProductCRUD from "./Product.CRUD";
import ProductVarietyCRUD from "./ProductVariety.CRUD";
import CRUDComponent from "../../containers/CRUDComponent";

const Router: MainPanelRoute[] = [
  { path: CRUDComponent.Path("/inventory/product"), component: ProductCRUD },
  { path: CRUDComponent.Path("/inventory/category"), component: CategoryCRUD },
  {
    path: CRUDComponent.Path("/inventory/product/variety"),
    component: ProductVarietyCRUD
  }
];

export default Router;

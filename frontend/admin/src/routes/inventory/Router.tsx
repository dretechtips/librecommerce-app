import { MainPanelRoute } from "../../interface/MainPanel.interface";
import Product from "./Product";
import ProductVariety from "./ProductVariety";
import Category from "./Category";
import CRUDWithRouter from "../../templates/CRUD.router";

const ProductRouter = CRUDWithRouter(
  Product,
  {},
  {
    create: "/inventory/product/add",
    read: "/inventory/product/details",
    search: "/inventory/product",
    modify: "/inventory/product/modify"
  }
);

const CategoryRouter = CRUDWithRouter(
  Category,
  {},
  {
    create: "/inventory/category/add",
    read: "/inventory/category/details",
    search: "/inventory/category",
    modify: "/inventory/category/modify"
  }
);

const ProductVarietyRouter = CRUDWithRouter(
  ProductVariety,
  {},
  {
    create: "/inventory/product/variation/add",
    read: "/inventory/product/variation/details",
    search: "/inventory/product/variation/",
    modify: "/inventory/product/variation/modify"
  }
);

const Router: MainPanelRoute[] = [
  ProductRouter("create"),
  ProductRouter("read"),
  ProductRouter("search"),
  ProductRouter("update&delete"),
  CategoryRouter("create"),
  CategoryRouter("read"),
  CategoryRouter("search"),
  CategoryRouter("update&delete"),
  ProductVarietyRouter("create"),
  ProductVarietyRouter("read"),
  ProductVarietyRouter("search"),
  ProductVarietyRouter("update&delete")
];

export default Router;

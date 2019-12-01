import { MainPanelRoute } from "../../interface/MainPanel.interface";
import Unprocessed from "./Unprocessed";
import Archive from "./Archive";
import CRUDWithRouter from "../../templates/CRUD.router";

const ArchiveRouter = CRUDWithRouter(
  Archive,
  {},
  {
    read: "/order/archive/details",
    create: "/order/archive/add",
    search: "/order/archive/",
    modify: "/order/archive/modify"
  }
);

const Router: MainPanelRoute[] = [
  { path: "/order/unprocessed", component: Unprocessed },
  ArchiveRouter("create"),
  ArchiveRouter("search"),
  ArchiveRouter("read"),
  ArchiveRouter("update&delete")
];

export default Router;

import { MainPanelRoute } from "../../interface/MainPanel.interface";
import Unprocessed from "./Unprocessed";
import Details from "./Details";
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
  { path: "/order/details/:id", component: Details },
  ArchiveRouter("create"),
  ArchiveRouter("search"),
  ArchiveRouter("read"),
  ArchiveRouter("update&delete")
];

export default Router;

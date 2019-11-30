import { MainPanelRoute } from "../../interface/MainPanel.interface";
import CRUDWithRouter from "../../templates/CRUD.router";
import Archive from "./Archive";

const ArchiveRouter = CRUDWithRouter(
  Archive,
  {},
  {
    create: "/subscription/archive/add",
    modify: "/subscription/archive/modify",
    search: "/subscription/archive",
    read: "/subscription/archive/details"
  }
);

export const Router: MainPanelRoute[] = [
  ArchiveRouter("create"),
  ArchiveRouter("read"),
  ArchiveRouter("search"),
  ArchiveRouter("update&delete")
];

export default Router;

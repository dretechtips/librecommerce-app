import { MainPanelRoute } from "../../interface/MainPanel.interface";
import CRUDWithRouter from "../../templates/CRUD.router";
import { Archive } from "./Archive";

const ArchiveRouter = CRUDWithRouter(
  Archive,
  {},
  {
    create: "/shipping/archive/add",
    search: "/shipping/archive/",
    modify: "/shipping/archive/modify",
    read: "/shipping/archive/details"
  }
);

export const Router: MainPanelRoute[] = [
  ArchiveRouter("create"),
  ArchiveRouter("read"),
  ArchiveRouter("update&delete"),
  ArchiveRouter("search")
];

export default Router;

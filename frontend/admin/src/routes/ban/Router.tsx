import { MainPanelRoute } from "../../interface/MainPanel.interface";
import CRUDWithRouter from "../../templates/CRUD.router";
import Archive from "./Archive";
import AppealArchive from "./appeal/Archive";

const ArchiveRouter = CRUDWithRouter(
  Archive,
  {},
  {
    create: "/ban/archive/add",
    read: "/ban/archive/details",
    search: "/ban/archive",
    modify: "/ban/archive/modify"
  }
);

const AppealArchiveRouter = CRUDWithRouter(
  AppealArchive,
  {},
  {
    create: "/ban/appeal/archive/add",
    read: "/ban/appeal/archive/details",
    search: "/ban/appeal/archive",
    modify: "/ban/appeal/archive/modify"
  }
);

export const Router: MainPanelRoute[] = [
  ArchiveRouter("create"),
  ArchiveRouter("read"),
  ArchiveRouter("search"),
  ArchiveRouter("update&delete"),
  AppealArchiveRouter("create"),
  AppealArchiveRouter("read"),
  AppealArchiveRouter("search"),
  AppealArchiveRouter("update&delete")
];

export default Router;

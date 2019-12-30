import { MainPanelRoute } from "../../interface/MainPanel.interface";
import Bug from "./Bug";
import CRUDWithRouter from "../../templates/CRUD.router";

const BugRouter = CRUDWithRouter(
  Bug,
  {},
  {
    create: "/report/bug/add",
    modify: "/report/bug/modify",
    search: "/report/bug",
    read: "/report/bug/details"
  }
);

const Router: MainPanelRoute[] = [
  BugRouter("create"),
  BugRouter("read"),
  BugRouter("search"),
  BugRouter("update&delete")
];

export default Router;

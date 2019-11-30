import { MainPanelRoute } from "../../interface/MainPanel.interface";
import Communicate from "./Communicate";
import CRUDWithRouter from "../../templates/CRUD.router";
import { Account } from "./Account";

const AccountRouter = CRUDWithRouter(
  Account,
  {},
  {
    create: "/user/account/add",
    modify: "/user/account/modify",
    search: "/user/account/",
    read: "/user/account/details"
  }
);

export const Router: MainPanelRoute[] = [
  { path: "/user/communicate", component: Communicate },
  AccountRouter("create"),
  AccountRouter("read"),
  AccountRouter("search"),
  AccountRouter("update&delete")
];

export default Router;

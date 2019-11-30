import { MainPanelRoute } from "../../interface/MainPanel.interface";
import Account from "./Account";
import CRUDWithRouter from "../../templates/CRUD.router";
import Communicate from "./Communicate";
import SendPassword from "./SendPassword";

const AccountRouter = CRUDWithRouter(
  Account,
  {},
  {
    read: "/customer/account/details",
    create: "/customer/account/add",
    search: "/customer/account",
    modify: "/customer/account/modify"
  }
);

export const Router: MainPanelRoute[] = [
  AccountRouter("create"),
  AccountRouter("read"),
  AccountRouter("search"),
  AccountRouter("update&delete"),
  { path: "/customer/communicate", component: Communicate },
  { path: "/customer/communicate/password", component: SendPassword }
];

export default Router;

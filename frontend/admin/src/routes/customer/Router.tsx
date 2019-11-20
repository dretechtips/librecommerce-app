import { MainPanelRoute } from "../../interface/MainPanel.interface";
import Account from "./Account";
import CRUDWithRouter from "../../templates/CRUD.router";

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
  AccountRouter("update&delete")
];

export default Router;

import { MainPanelRoute } from "../../interface/MainPanel.interface";
import Communicate from "./Communicate";
import CRUDWithRouter from "../../templates/CRUD.router";
import { Account } from "./Account";

const AccountRouter = CRUDWithRouter(
  Account,
  {},
  {
    create: "/user/account/add"
  }
);

export const Router: MainPanelRoute[] = [
  { path: "/user/communicate", component: Communicate }
];

export default Router;

import { MainPanelRoute } from "../../interface/MainPanel.interface";
import Code from "./Code";
import Coupon from "./Coupon";

export const Router: MainPanelRoute[] = [
  { path: "/promotion/code", component: Code },
  { path: "/promotion/coupon", component: Coupon }
];

export default Router;

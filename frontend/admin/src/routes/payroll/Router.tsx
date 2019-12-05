import { MainPanelRoute } from "../../interface/MainPanel.interface";
import Overview from "./Overview";
import Payslip from "./Payslip";
import Pay from "./Pay";

export const Router: MainPanelRoute[] = [
  { path: "/payroll/overview/", component: Overview },
  { path: "/payroll/payslip/", component: Payslip },
  { path: "/payroll/pay/", component: Pay }
];

export default Router;

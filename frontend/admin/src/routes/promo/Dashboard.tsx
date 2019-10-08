import { DashboardProps } from "../../interface/routes/Dashboard.interface";

export const PromoDashboardProps: DashboardProps = {
  title: "Promotion",
  basePath: "/promotion",
  icons: [{name: "Manage Coupon", icon: "fas fa-tag", path: "/coupon"},
    {name: "Manage Code", icon: "fas fa-code", path: "/code"}]
}
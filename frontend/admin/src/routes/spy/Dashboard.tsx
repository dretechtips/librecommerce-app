import { DashboardProps } from "../../interface/routes/Dashboard.interface";

export const SpyDashboardProps: DashboardProps = {
  title: "Spy",
  basePath: "/spy",
  icons: [{name: "View Traffic", icon: "fas fa-traffic-light", path: "/traffic"},
    {name: "View Price", icon: "fas fa-money-bill", path: "/price"}]
}
import { DashboardProps } from "../../interface/routes/Dashboard.interface";

export const OrderDashboardProps: DashboardProps = {
  title: "Order",
  basePath: "/order",
  icons: [{name: "Manage Unprocessed", icon: "fas fa-stream", path: "/unprocessed"},
  {name: "Manage Hold", icon: "fas fa-pause-circle", path: "/hold"},
  {name: "View Archive", icon: "fas fa-archive", path: "/archive"}]
}
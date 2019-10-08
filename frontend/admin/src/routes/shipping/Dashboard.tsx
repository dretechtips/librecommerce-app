import { DashboardProps } from "../../interface/routes/Dashboard.interface";

export const ShippingDashboardProps: DashboardProps = {
  title: "Shipping",
  basePath: "/shipping",
  icons: [{name: "Manage Unprocessed", icon: "fas fa-stream", path: "/unprocessed"},
    {name: "View Archive", icon: "fas fa-archive", path: "/archive"},
    {name: "Track package", icon: "fas fa-box", path: "/tracking"}]
}
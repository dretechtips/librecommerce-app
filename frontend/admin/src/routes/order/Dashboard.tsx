import { DashboardProps } from "../../interface/Dashboard.interface";

const Dashboard: DashboardProps = {
  title: "Order",
  basePath: "/order",
  icons: [{name: "Manage Unprocessed", icon: "fas fa-stream", path: "/unprocessed"},
  {name: "Manage Hold", icon: "fas fa-pause-circle", path: "/hold"},
  {name: "View Archive", icon: "fas fa-archive", path: "/archive"}]
}

export default Dashboard;
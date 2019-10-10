import { DashboardProps } from "../../interface/Dashboard.interface";

const Dashboard: DashboardProps = {
  title: "Billing",
  basePath: "/billing",
  icons: [{name: "View Today", icon: "fas fa-calendar-day", path:"/today"},
    {name: "Search Archive", icon: "fas fa-archive", path: "/archive"}]
}

export default Dashboard;
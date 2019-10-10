import { DashboardProps } from "../../interface/Dashboard.interface";

const Dashboard: DashboardProps = {
  title: "Payroll",
  basePath: "/payroll",
  icons: [{name: "View payment", icon: "fas fa-users", path:"/list"},
    {name: "Release payment", icon: "fas fa-money-bill", path:"/pay"}]
}

export default Dashboard;
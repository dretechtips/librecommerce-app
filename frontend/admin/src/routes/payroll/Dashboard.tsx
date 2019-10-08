import { DashboardProps } from "../../interface/routes/Dashboard.interface";

export const PayrollDashboardProps: DashboardProps = {
  title: "Payroll",
  basePath: "/payroll",
  icons: [{name: "View payment", icon: "fas fa-users", path:"/list"},
    {name: "Release payment", icon: "fas fa-money-bill", path:"/pay"}]
}